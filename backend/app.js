const {config} = require("dotenv");
if(process.env.NODE_ENV !=="production"){
    config();
}
const express = require("express");
const mongoose = require("mongoose");
const MONGO_URI = process.env.NODE_ENV == "production"? process.env.MONGO_URI_PROD:process.env.MONGO_URI_DEV;
const router = require("./routes");

const app = express();
mongoose.connect(MONGO_URI, {
    keepAlive: true,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("connected to db"))
    .catch((error) => console.log(`failed to connect to db :${error.message}`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",router);
app.use((err,req,res,next)=>{
    if(err instanceof Error){
       return res.status(500).json({
            success:false,
            error:error.message
        })
    }
    res.status(500).json({
        success:false,
        error:"something went wrong"
    })
})

module.exports = app;