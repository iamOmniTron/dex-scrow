const mongoose  = require("mongoose");

const {Schema,model} = mongoose;

const CountrySchema = new Schema({
    name:{
        type:String,
        require:true
    },
    currency:{
        type:String,
        require:true
    },
    code:{
        type:String
    },
    rateToDollar:{
        type:mongoose.Types.Decimal128
    },
    shortCode:{
        type:String
    }
});

const Country = model("Country",CountrySchema);
module.exports = Country;