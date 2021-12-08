const Trade = require("../models/trade");
const User = require("../models/user");
const {getAdvert} = require("../models/advert");


module.exports = {
    create: async (advertId,buyerId,amount)=>{
       try{
           const ad = await getAdvert(advertId);
           if(!ad || ad == undefined){
               throw new Error("invalid advert")
           }
           if(ad.amount < amount){
               throw new Error("cannot buy more than available");
           }
           const newTrade = new Trade({
               advert:advertId,buyer:buyerId,unit:amount
           });
           const isSaved = await newTrade.save();
           if(!isSaved){
               return null;
           }
           return newTrade;
       }catch(error){
           throw new Error(error.message);
       }
    },
    settle: async (advertId)=>{
        try{
            const isUpdated = await Trade.findOneAndUpdate({_id:advertId},{settled:true});
            if(!isUpdated){
                return false;
            }
            return true;
        }catch(error){
            throw new Error(error.message);
        }
    }
}