require("dotenv").config();
const Jwt = require("jsonwebtoken");
const AUTH_TOKEN_SECRET = process.env.TOKEN_SECRET;
const EXPIRATION = process.env.TOKEN_EXPIRY|"7d";

module.exports={
    assignToken : (userId,role="user")=>{
        const token = Jwt.sign({userId,role},AUTH_TOKEN_SECRET,{expiresIn:EXPIRATION});

        return token;
    }
}