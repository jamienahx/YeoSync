const mongoose = require("mongoose");

// user = { "email": "abc@xyz.com", "password": "12345678" }

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  jwt: String,
  is_manager: Boolean,
  is_admin: Boolean,
  name: String,

});

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("User", userSchema);