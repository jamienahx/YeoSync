const mongoose = require("mongoose");
const Task = require("./daos/task");// adjust path if needed
const sampleTasks = require("./sampleTasks"); // path to your sample data file
require("dotenv").config();

async function seedDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");

    // Optional: clear existing tasks first
    await Task.deleteMany({});
    console.log("Cleared existing tasks");

    // Insert sample tasks
    await Task.insertMany(sampleTasks);
    console.log("Inserted sample tasks");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error(err);
  }
}

seedDB();
