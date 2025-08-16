const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
