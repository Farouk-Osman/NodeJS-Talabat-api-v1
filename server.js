const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

const app = express();
dotenv.config({ path: './.env' });
dbConnection();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
console.log(`Environment: ${process.env.NODE_ENV}`);

app.use(express.json());
app.use('/api/v1/categories', categoryRoute);
