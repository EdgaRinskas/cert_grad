
const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/db');

async function getCollection() {
  const db = getDatabase();
  return db.collection('Registered');
}


exports.registerUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const users = await getCollection();


    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser = { name, email, age };
    await users.insertOne(newUser);

    res.status(201).json({ message: 'User successfully registered', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await (await getCollection()).find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const users = await getCollection();

    const updatedUser = await users.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, email, age } },
      { returnDocument: 'after' }
    );

    if (!updatedUser.value) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await getCollection();

    const deletedUser = await users.findOneAndDelete({ _id: ObjectId(id) });

    if (!deletedUser.value) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
