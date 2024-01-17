const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/deepral";

// Check if the connection string is defined
if (!mongoURI) {
    console.error("Error: MongoDB connection string is not defined.");
    process.exit(1); // Exit the process if the connection string is not defined
  }

// Set 'strictQuery' to false to suppress the deprecation warning
mongoose.set('strictQuery', false);

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDB");
    });
};

module.exports = connectToMongo;
