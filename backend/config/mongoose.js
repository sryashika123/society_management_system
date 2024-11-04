const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/sociytey_managment_system");

const db = mongoose.connection;

db.once('open', (e)=>{
    if(e){
        console.log("db not conncted");
    }
    console.log("db conncted");
});

module.exports = db;