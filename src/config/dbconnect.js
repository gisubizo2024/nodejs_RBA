const mongoose = require("mongoose");

const dbconnect = async() => {
    try{
        const conn = await mongoose.connect(process.env.CONNECTION_URL);
        console.log(`MongoDb Connected on Host: ${conn.connection.host}, Name: ${conn.connection.name}`);
    }catch(error){
        console.log(error);
    }
    
};

module.exports = dbconnect; 