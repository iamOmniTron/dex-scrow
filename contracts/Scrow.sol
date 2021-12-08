// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./IBEP20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Advert{
    struct advert{
        address payable owner;
        uint amount;
        address asset;
        uint balance;
        bool closed;
    }

    event AdvertClosed(string advertId);
    event Deposited(string advertId,uint amount);
    event AssetTransferred(string advertId,uint amount,address buyer);
    

    mapping(string=>advert)Adverts;

    function createAdvert (string memory _advertId,uint _amount, address _asset) external{
        require(_amount > 0, "initial deposit cannot be null");
        Adverts[_advertId] = advert(payable(msg.sender),_amount,_asset,_amount,false);
    }

    function deposit(string memory advertId,uint _amount) external payable returns (bool success){
        advert memory ad = Adverts[advertId];
        require(msg.sender == ad.owner, "unauthorized to deposit");
        success = IBEP20(ad.asset).transferFrom(msg.sender, address(this), _amount);
        if(success == true){
            Adverts[advertId].balance += _amount;
            emit Deposited(advertId,_amount);
        }
        return success;
    }

    recieve() external payable{};

    function close(string memory advertId) external returns( bool success){
        advert memory ad = Adverts[advertId];
        require(ad.balance > 0, "insufficient balance");
        require(msg.sender == ad.owner,"unauthorized to close advert");
        success = IBEP20(ad.asset).transferFrom(address(this), msg.sender, ad.balance);
        if(success == true){
            Adverts[advertId].balance -= ad.balance;
            emit AdvertClosed(advertId);
        }
        return success;
    }

    function transferAsset(string memory advertId,address payable buyer,uint _amount) external returns (bool success){
        advert memory ad = Adverts[advertId];
        require(ad.balance > 0, "insufficient balance");
        require(_amount <= ad.balance,"insufficient funds");
        success = IBEP20(ad.asset).transferFrom(address(this), buyer,_amount);
        if(success == true){
            // emit events
            Adverts[advertId].balance -= _amount;
            emit AssetTransferred(advertId, _amount, buyer);
        }
        return success;
    }
}



contract Trade{

    struct trade{
        string advertId;
        address buyer;
        uint amount;
    }
    address admin;
    Advert A;

    mapping(string=>trade)Trades;

    constructor (address _admin,address _advert){
        admin = _admin;
        A = Advert(_advert);
    }

    function createTrade(string memory _tradeId, string memory _advertId,address _buyer,uint _amount) external returns (bool){
        advert memory ad = A.Adverts[_advertId];
        require(_amount <= ad.balance,"insufficient balance to initiate trade");
        Trades[_tradeId] = trade(_advertId,_buyer,_amount);
    }

    function buy(string memory _tradeId) external returns (bool success){
        trade T = Trades[_tradeId];
        // could've done checks for msg.sender to be buyer but contract deployer will make the transfer
        require(msg.sender == admin,"unauthorized to make transfer");
        success = A.transferAsset(T.advertId,T.buyer,T.amount);
        return success;
    }

}