// migrate-add-times.js
const mongoose = require("mongoose");
const Task = require("./daos/task"); // adjust path as needed
require("dotenv").config();

// Update this with your MongoDB URI

const MONGO_URI = process.env.DATABASE_URL;

async function runMigration() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Update all documents that don't have start_time and end_time
    const result = await Task.updateMany(
      { $or: [{ start_time: { $exists: false } }, { end_time: { $exists: false } }] },
      { $set: { start_time: null, end_time: null } }
    );

    console.log(`✅ Migration complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

runMigration();
