const mongoose = require('mongoose');

const connectDB = async () => {
    if(!process.env.DB_URI) {
        throw new Error("There is no DB_URI in enviroinment variable.")
    };

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected...");
    } catch (err) {
        console.error(err.message);
    };
};

module.exports = connectDB;