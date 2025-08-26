const mongoose = require("mongoose");
const Task = require("./daos/task");// adjust path if needed
require("dotenv").config();


const MONGO_URI = process.env.DATABASE_URL;

async function backfillPinned() {
  await mongoose.connect(MONGO_URI);
  const result = await Task.updateMany(
    { pinned: { $exists: false } },
    { $set: { pinned: false } }
  );
  console.log(`Updated ${result.modifiedCount} tasks`);
  await mongoose.disconnect();
}

backfillPinned().catch(err => {
  console.error(err);
  process.exit(1);
});
