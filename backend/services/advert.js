const Advert = require("../models/advert");


module.exports = {
    create: async (advertDetails)=>{
        const newAdvert = new Advert(...advertDetails);
        try{
            const isSaved = await newAdvert.save();
            if(!isSaved){
                return false;
            }
        }catch(error){
            throw new Error(error.message);
        }
        return true;
    },
    edit:async (id,advertDetails)=>{
        try{
            const isUpdated = await Advert.findOneAndUpdate({
                _id:id
            },...advertDetails);
            if(!isUpdated){
                return false;
            }
        }catch(error){
            throw new Error(error.message)
        }
        return true;
    },
    getadvert: async (id)=>{
        try{
            const advert = await Advert.findOne({_id:id});

            return advert;
        }catch(error){
            throw new Error(error.message);
        }
    },
    getAdverts: async ()=>{
        try {
            const adverts = await Advert.find();
            return adverts;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getActiveAdverts : async ()=>{
        try {
            const adverts = await Advert.find({status:"active"});
            return adverts;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}