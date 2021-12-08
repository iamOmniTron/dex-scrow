const http = require("http");
const {app} = require("./app");
const PORT = process.env.PORT || 8000;

http.createServer(app).listen(PORT,()=>{
    console.log(`server up and running at port ${PORT}`);
});