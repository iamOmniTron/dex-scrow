const PaymentMethod = require("../models/paymentMethod");


module.exports = {
    addPaymentMethod: async (name)=>{
        if(!name || typeof name !== "string"){
            throw new Error("a payment method name is required")
        }
        const newPaymentMethod = new PaymentMethod({name});
        try {
            const isSaved = await newPaymentMethod.save();
            if(!isSaved){
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
        return true;
    },
    getByName: async (name)=>{
        if(!name || typeof name !== "string"){
            throw new Error("a payment method name is required")
        }
        try{
            const paymentMethod = await PaymentMethod.findOne({name});
            return paymentMethod;
        }catch(error){
            throw new Error(error.message);
        }
    },
    updatePaymentMethod: async (id,details)=>{
        try{
            const isUpadated = await PaymentMethod.findOneAndUpdate({_id:id},{...details});
            if(!isUpdated){
                return false;
            }
        }catch(error){
            throw new Error(error.message);
        }
        return true;
    },
    deletePaymentMethod: async (id)=>{
        try{
            const isDeleted = await PaymentMethod.deleteOne({_id:id});
            if(!isDeleted){
                return false;
            }
        }catch(error){
            throw new Error(error.message);
        }
    }
}