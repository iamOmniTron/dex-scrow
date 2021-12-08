const {create,settle} = require("../services/trade");

module.exports = {
    CreateTrade: async (req,res,next)=>{
        const {advertId} = req.params;
        try{
            const response = await create(advertId,req.body);
            if(!response){
                return res.json({
                    success:false,
                    message:"cannot initiate trade"
                });
            }
            return res.json({
                success:true,
                message:"trade created successfully"
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    Settle: async (req,res,next)=>{
        const {advertId} = req.params;
        try{
            const response = await settle(advertId);
            if(!response){
                return res.json({
                    success:false,
                    message:"trade settled successfully"
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