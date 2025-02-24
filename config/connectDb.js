const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        
    } catch (error) {
        console.error(error);
        
    }
    
}

module.exports = connectDb;