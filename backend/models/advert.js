const mongoose = require("mongoose");
const User = require("./user");
const Asset = require("./asset");
const PaymentMethod = require("./paymentMethod");
const {Schema,model} = mongoose;

const AdvertSchema = new Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    asset:{
        type:mongoose.Types.ObjectId,
        ref:"Asset"
    },
    paymentMethod:{
        type:mongoose.Types.ObjectId,
        ref:"PaymentMethod"
    },
    currency:{
        type:String
    },
    factor:{
        type:mongoose.Types.Decimal128,
    },
    deadline:{
        type:Date
    },
    unit:{
        type:mongoose.Types.Decimal128
    },
    amount:{
        type:mongoose.Types.Decimal128
    },
    status:{
        type:String,
        enum:["active","closed"],
        default:"active",
    },
    notes:{
        type:String
    }
});

const Advert = model("Advert",AdvertSchema);

module.exports = Advert;