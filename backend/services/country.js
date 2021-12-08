const Country = require("../models/country");


module.exports = {
    addCountry: async (name,currency,code,shortCode)=>{
        if(name == "undefined"){
            throw new Error("invalid name")
        }
        if(currency == "undefined"){
            throw new Error("invalid currency")
        }
        if(code == "undefined"){
            throw new Error("invalid code")
        }
        if(shortCode == "undefined"){
            throw new Error("invalid shortCode")
        }
        try {
            const newCountry = new Country({
                name,currency,code,shortCode
            });
            const isSaved = await newCountry.save();
            if(!isSaved) return false;
        } catch (error) {
            throw new Error(error.message)
        }
        return  true;
    },
    editCountry: async (id,details)=>{
        if(!id){
            throw new Error("invalid country id");
        }
        try {
        const isUpdated = await Country.findOneAndUpdate({_id:id},{...details});
        if(!isUpdated){
            return false;
        }
        } catch (error) {
            throw new Error(error.mesage);
        }
        return true;
    },
    getCountry: async (id)=>{
        if(!id){
            throw new Error("invalid country id")
        }
        try{
            const country = await Country.findOne({_id:id});
        }catch(error){
            throw new Error(error.message)
        }
        return country;
    },
    getCountries: async ()=>{
        try {
            const countries = await Country.find({});
        } catch (error) {
            throw new Error(error.message)
        }
        return countries;
    }
}