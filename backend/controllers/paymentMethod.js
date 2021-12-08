const {addPaymentMethod,getByName,updatePaymentMethod,deletePaymentMethod} = require("../services/paymentMethod");


module.exports = {
    AddMethod: async (req,res,next)=>{
        const {name} = req.body;
        try{
            const response = await addPaymentMethod(name);
            if(!response){
                return res.json({
                    success:false,
                    message:"could not add payment method"
                });
            }
            return res.json({
                success:true,
                message:"payment method added successfully"
            });
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            });
        }
    },
    GetPaymentMethod: async (req,res,next)=>{
        const {name} = req.params;
        try{
            const response = await getByName(name);
            if(!response || response == undefined){
                return res.json({
                    success:false,
                    message:"cannot get peyment method"
                })
            }
            return res.json({
                sucess:true,
                data:response
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    EditPaymentMethod: async (req,res,next)=>{
        const {methodId} = req.params;
        try{
            const response = await updatePaymentMethod(methodId,req.body);
            if(!response){
                return res.json({
                    success:false,
                    message:"cannot edit payment method"
                })
            }
            return res.json({
                success:true,
                message:"payment method updated successfully"
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    DeletePaymentMethod: async(req,res,next)=>{
        const {methodId} = req.params;
        try{
            const response = await deletePaymentMethod(methodId);
            if(!response){
                return res.json({
                    success:false,
                    message:"cannot dele payment method"
                })
            }
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    }
}