const User = require("../models/user");
const Kyc = require("../models/kyc");

module.exports = {
    create: async (address,phone)=>{
        if(!address || typeof address !== "string"){
            throw new Error("a wallet address is required")
        };
        if(!phone || typeof phone !== "string"){
            throw new Error("user phone number is required")
        };
        if(!(address.startsWith("0"))){
            throw new Error("invalid wallet address");
        }
        const user = await User.findOne({address});
        if(user){
            throw new Error("user already exist");
        }
        const newUser = new User({address,phone});
        try {
           const isSaved = await newUser.save();
           if(!isSaved){
               return false;
           }
        } catch (error) {
            throw new Error("unable to signup user")
        }
        return {
            success:true,
            userId:newUser._id
        };
    },
    // login: async (address)=>{

    // },
    submitKyc : async (image,firstname,lastname,userId)=>{
        if(!image || typeof image !== "string"){
            throw new Error("an image is required")
        }
        if(!firstname || typeof firstname !== "string"){
            throw new Error("firstname is required")
        }
        if(!lastname || typeof lastname !== "string"){
            throw new Error("lastname is required")
        }
        const newKyc = new Kyc({firstname,lastname,imageUrl:image,user:userId});
        await User.findOneAndUpdate({_id:userId},{kycStatus:"pending"});
        try {
           const isSaved = await newKyc.save();
           if(!isSaved){
               return false;
           }
        } catch (error) {
            throw new Error("cannot very user kyc  status")
        }
        return true;
    },
    confirmUser : async (userId)=>{
        if(!userId){
            throw new Error("invalid user id")
        }
        try{
            const isUpdated = await User.findOneAndUpdate({_id:userId},{kycStatus:true});
            if(!isUpdated){
            return false;
        }
        }catch(error){
            throw new Error(error.message)
        }
        return true;
    },
}
