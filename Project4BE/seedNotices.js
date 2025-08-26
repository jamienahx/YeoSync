const mongoose = require("mongoose");
require("dotenv").config();

const Notice = require("./daos/notice");
const notices = require("./sampleDrafts"); // <-- use the existing file

const MONGO_URI = process.env.DATABASE_URL;

async function seedNotices() {
  try {
    await mongoose.connect(MONGO_URI);

    const result = await Notice.insertMany(notices);
    console.log(`Inserted ${result.length} notices`);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding notices:", err);
    process.exit(1);
  }
}

seedNotices();
