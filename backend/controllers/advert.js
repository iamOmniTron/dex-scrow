const {create,edit,getAdvert,getAdverts} = require("../services/advert");

module.exports = {
    CreateAdvert : async (req,res,next)=>{
        const userId = req.user;
        const advertDetails = {
            owner:userId,
            ...req.body
        }
        try{
            const response = await create(advertDetails);
            if(response !== true){
                return res.json({
                    success:false,
                    message:"cannot create advert"
                });
        }
        return res.json({
            success:true,
            message:"advert created successfully"
        })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    GetAdvert : async (req,res,next)=>{
        try{
            const {advertId} = req.params;
            const response = await getAdvert(advertId);
            if(!response || response == undefined){
                return res.json({
                    success:false,
                    message:"cannot get advert"
                })
            }
            return res.json({
                success:true,
                data:response
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    GetAdverts: async (req,res,next)=>{
        try{
            const response = await getAdverts();
            if (!response || response == undefined){
                return res.json({
                    success:false,
                    message:"cannot get adverts"
                })
            };

            return res.json({
                success:true,
                data:response
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    UpdateAdvert : async (req,res,next)=>{
        try{
            const {advertId} = req.params;
            const response = await edit(advertId,req.body);
            if(response !== true){
                return res.json({
                    success:false,
                    message:"cannot update advert"
                })
            }
            return res.json({
                success:true,
                message:"advert updated successfully"
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    }
};