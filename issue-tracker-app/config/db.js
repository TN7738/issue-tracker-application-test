const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.CONNECTION_STR);

    console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
