const mongoose = require("mongoose");
const {Schema,model} = mongoose;


const PaymentMethodSchema = new Schema({
    name:{
        type:String,
        required:true
    },
});

const PaymentMethod = model("PaymentMethod",PaymentMethodSchema);

module.exports = PaymentMethod;