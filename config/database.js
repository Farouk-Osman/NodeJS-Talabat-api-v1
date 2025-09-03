const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });


const dbConnection = () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err.name , err.message));
    }
module.exports = dbConnection;
