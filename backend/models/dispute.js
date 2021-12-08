const mongoose = require("mongoose");
const User = require("./user");
const Contract = require("./contract");
const {Schema,model,Types} = mongoose;

const DisputeSchema = new Schema({
    reporter:{
        type:Types.ObjectId,
        ref:"User",
    },
    accused:{
        type:Types.ObjectId,
        ref:"User",
    },
    reason:{
        type:String,
    },
    contract:{
        type:Types.ObjectId,
        ref:"Contract",
    },
    resolved:{
        type:Boolean,
    }
});

const Dispute = model("Dispute",DisputeSchema);

module.exports = Dispute;