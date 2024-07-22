// Establishing the connection between the database and server with mongoose;

const mongoose = require("mongoose");


// By this line , All the information present in the enviroment variable will stored in the process object  
require("dotenv").config();

const dbconnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("connection Established with Database");
    })
    .catch((error)=>{
        console.log("Error occur while connecting with Database" + error);
        console.log(error.message);
        process.exit(1);
    })
}
module.exports = dbconnect;