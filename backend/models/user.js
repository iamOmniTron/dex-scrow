const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    address:{
        type:String,
    },
    kycStatus:{
        type:String,
        enum:["invalid","pending","verified"],
        default:"invalid"
    },
    phone:{
        type:String
    },
    isBanned:{
        type:Boolean,
        default:false
    }
});

const User = model("User",UserSchema);

module.export = User;