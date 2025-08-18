const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
dotenv.config({ path: './config.env' });
const port = process.env.PORT;
const app = express();
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
console.log(`Environment: ${process.env.NODE_ENV}`);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
