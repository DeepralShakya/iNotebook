const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

// Set 'strictQuery' to false to suppress the deprecation warning
mongoose.set('strictQuery', false);

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDB");
    });
};

module.exports = connectToMongo;
