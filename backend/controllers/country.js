const {addCountry,editCountry,getCountries,getCountry}= require("../services/country");

module.exports = {
    AddCountry: async (req,res,_)=>{
        const {name,currency,code,shortCode} = req.body;
        try{
            const isAdded = await addCountry(name,currency,code,shortCode);
        }catch(error){
            return res.json ({
                success:false,
                error:error.message
            })
        }
        if(!isAdded || isAdded == false){
            return res.json({
                success:false,
                message:"unable to add country",
            })
        }
        return res.json({
            success:true,
            message:"country added successfully"
        })
    },
    EditCountry: async (req,res,_)=>{
        const {id} = req.params;
        try{
            const isUpdated = await editCountry(id,req.body);
        }catch(error){
           return res.json({
               success:false,
               error:error.message
           }) 
        }
       
        if(!isUpdated || isUpdated == false){
            return res.json({
                success:false,
                message:"unable to update country"
            })
        }
        return res.json({
            success:true,
            messae:"country updated successfully"
        })
    },
    GetCountry: async (req,res,_)=>{
        const {id} = req.params;
        try {
            const country = await getCountry(id);
        } catch (error) {
            return res.json({
                success:false,
                error:error.message
            })
        }
        return res.json({
            success:true,
            data:country
        })
    },
    GetCountries: async (req,res,_)=>{
        try{
            const country = await getCountries();
        }catch(error){
            return res.json({
                success:false,
                error:error.message
            })
        }
        return res.json({
            success:true,
            data:countrie
        })
    }
}

