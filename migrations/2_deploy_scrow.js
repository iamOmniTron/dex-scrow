const Advert = artifacts.require("Advert");
const Trade = artifacts.require("Trade");

module.exports = async function (deployer) {
  deployer.deploy(Advert);
  deployer.deploy(Trade);
};
