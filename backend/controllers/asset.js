const {addAsset,getAsset,getAssets,editAsset} = require("../services/asset");


module.exports = {
    AddAsset: async (req,res,next)=>{
        const {name,rate,shortName} = req.body;
        try{
            const response = await addAsset(name,rate,shortName);
            if(response !== true){
                return res.json({
                    success:false,
                    message:"cannot add asset at the moment"
                })
            }
            return res.json({
                success:true,
                message:"asset added successfully"
            })
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    GetAsset: async (req,res,next)=>{
        try{
            const {assetId} = req.params;
            const response = await getAsset(assetId);
            if(!response || response == undefined){
                return res.json({
                    success:false,
                    message:"cannot find asset"
                })
            }
            return res.json({
                success:true,
                data:response
            });
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    },
    GetAssets: async (req,res,next)=>{
        try{
            const response = await getAssets();
            if(!response || response == undefined){
                return res.json({
                    success:false,
                    message:"cannot get assets"
                });
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
    EditAsset: async (req,res,next)=>{
        try{
            const{assetId} = req.params;
            const response = await editAsset(assetId,req.body);
            if(!response || response == undefined){
                return res.json({
                    success:false,
                    message:"cannot update assets"
                })
            }
            return res.json({
                success:true,
                message:"asset updated successfully"
            }); 
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
    }
}