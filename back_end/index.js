
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const app = express();
dotenv.config();


const PORT = process.env.PORT || 3000;


connectToDatabase();


app.use(cors());
app.use(express.json());


app.use('/api/users', require('./routes/userRoutes'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
