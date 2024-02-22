const mongoose = require('mongoose');

const connectDb = async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`MongoDb connected ${connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
  
}

module.exports = connectDb;