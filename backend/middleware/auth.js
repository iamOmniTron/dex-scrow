require("dotenv").config();
const Jwt = require("jsonwebtoken");
const AUTH_TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = {
    auth: async (req,res,next)=>{
        const header = req.headers["Authorization"];
        if(!header || typeof header !== "string"){
            return next('unauthorized');
        }
        const token = header.split(" ")[1];
        const {userId} = Jwt.verify(token,AUTH_TOKEN_SECRET);
        if(userId == undefined || userId == null){
            return next("unauthorized")
        }
        req.userId = userId;
        return next();
    },
}