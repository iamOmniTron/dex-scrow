const mongoose = require("mongoose");
const User = require("./user");
const {Schema,model,Types} = mongoose;
const KycSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    user:{
        type:Types.ObjectId,
        ref:"User"
    },
    lastname:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
});

const Kyc =  model("Kyc",KycSchema);

module.exports = Kyc;