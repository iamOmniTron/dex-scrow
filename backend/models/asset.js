const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const AssetSchema = new Schema({
    name:{
        type:String
    },
    rateToDollar:{
        type: mongoose.Types.Decimal128
    },
    shortName:{
        type:String
    },
    address:{
        type:String
    }
});

const Asset = model("Asset",AssetSchema);

module.exports = Asset;