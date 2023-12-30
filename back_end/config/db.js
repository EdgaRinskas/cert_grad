
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let database;

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    database = client.db('Eventera');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDatabase() {
  return database;
}

module.exports = { connectToDatabase, getDatabase };
