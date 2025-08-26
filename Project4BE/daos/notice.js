const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({

    type:{
    type: String,
    required: true,
    enum: [
      "Concert",     
      "Leave/Absence",   
      "Release",
      "Ticketing",
      "Event"
    ]
  },

 draft: {type:String, default: ""}

})

module.exports = mongoose.model("Notice", noticeSchema);