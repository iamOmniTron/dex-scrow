const {create,submitKyc,confirmUser} = require("../models/user");
const {assignToken} = require("../utils/helper");

module.exports = {
    Signup: async (req,res,next)=>{
        const {phone,walletAddress} = req.body;

        try{
            const {success,userId} = await create(walletAddress,phone);
            if(success !== true){
                return  res.json({
                    success:false,
                    message:"unable to signup user"
                })
            }
            const token = assignToken(userId);
            return res.json({
                success:true,
                message:"user signedup successfully",
                token
            });
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    RequestKYC: async (req,res,next)=>{
        const image = req.file;
        const {firstname,lastname} = req.body;
        const userId = req.userId;
        try{
            const response  = await submitKyc(image.path,firstname,lastname,userId);
            if(response == false){
                return res.json({
                    success:false,
                    message:"could not make request, please try again"
                })
            }
            return res.json({
                success:true,
                message:"request submitted successfully"
            })
        }catch(error){
           return res.json({
               success:false,
               message:error.message
           }) 
        }
    },
    ConfirmUser: async (req,res,next)=>{
        const {userId} = req.params;
        try{
            const response = await confirmUser(userId);
            if(response !== true){
                return res.json({
                    success:false,
                    message:"cannot perform action, please try again"
                })
            }
            return res.json({
                success:true,
                message:"user confirmed successfully"
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            });
        }
    }
}