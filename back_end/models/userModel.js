

const { MongoClient } = require('mongodb');

const userSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
};

async function createUserModel() {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db('Eventera');
    const users = database.collection('Registered');


    await users.createIndex({ email: 1 }, { unique: true });

    return users;
  } finally {
    await client.close();
  }
}

module.exports = createUserModel;
