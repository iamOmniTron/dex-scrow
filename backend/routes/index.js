const {Router} = require("express");
const router = Router();
const {auth} = require("../middleware");
const {Signup,RequestKYC,ConfirmUser} = require("../controllers/user");
const {AddMethod,GetPaymentMethod,EditPaymentMethod,DeletePaymentMethod} = require("../controllers/paymentMethod");
const {AddCountry,EditCountry,GetCountry,GetCountries} = require("../controllers/country");
const {AddAsset,GetAsset,GetAssets,EditAsset} = require("../controllers/asset");
const {CreateAdvert,GetAdvert,GetAdverts,UpdateAdvert} = require("../controllers/advert");
const {CreateTrade,Settle} = require("../controllers/trade");

router.post("/auth/signup",Signup);

router.post("/user/kyc",auth,RequestKYC);
// admin
router.post("/user/confirm",auth,ConfirmUser);

router.post("/methods/payment",auth,AddMethod);
// admin
router.get("/methods/payment/:name",auth,GetPaymentMethod);
// admin
router.post("/methods/payment/:methodId",auth,EditPaymentMethod);
// admin
router.post("/methods/payment/delete/:methodId",auth,DeletePaymentMethod);
// admin
router.post("/country",auth,AddCountry);
// admin
router.post("/country/:id",auth,EditCountry);
// admin
router.get("/country/:id",auth,GetCountry);
router.get("/countries",auth,GetCountries);
router.post("/asset",auth,AddAsset);
router.get("/asset/:assetId",auth,GetAsset);
router.get("/assets",auth,GetAssets);
router.post("/asset/:assetId",auth,EditAsset);
router.post("/advert",auth,AddAdvert);
router.get("/advert/:advertId",auth,GetAdvert);
router.get("/advert/",auth,GetAdverts);
router.post("/trade/:advertId",Settle);

module.exports = router;