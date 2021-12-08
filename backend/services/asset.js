const Asset = require("../models/asset");


module.exports = {
    addAsset: async (name,rateToDollar,address,shortName)=>{
        try{
            const newAsset = new Asset({
                name,rateToDollar,shortName,address
            });
           const isAssetSaved = await newAsset.save();
           if(!isAssetSaved){
               return false;
           }
        }catch(error){
            throw new Error(error.message)
        }
        return true;
    },
    getAsset: async (id)=>{
        let asset
        try {
             asset = await Asset.findOne({_id:id})
        } catch (error) {
            throw new Error(error.message)
        }
        return asset;
    },
    getAssets: async ()=>{
        let assets
        try {
             assets = await Asset.find({});
        } catch (error) {
            throw new Error(error.message)
        }
        return assets;
    },
    editAsset: async (id, details)=>{
        try{
            const isUpdated = await Asset.findOneAndUpdate({_id},{...details});
            if(!isUpdated){
                return false;
            }
            return true;
        }catch(error){
            return false;
        }
    }
}
