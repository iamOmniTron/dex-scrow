const mongoose = require("mongoose");
const {Schema,model,Types} = mongoose;
const Advert = require("./advert");

const TradeSchema = new Schema({
    advert:{
        type:Types.ObjectId,
        ref:"Advert"
    },
    buyer:{
        type:String,
        requird:true
    },
    unit:{
        type:Types.Decimal128
    },
    settled:{
        type:Boolean,
        default:false,
    }
});

const Trade = model("Trade",TradeSchema);
module.exports = Trade;