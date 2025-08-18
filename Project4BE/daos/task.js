const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  member: {type:String, required: true},
  category:{
    type: String,
    required: true,
    enum: [
      "Practice",       // Dance, vocal, or instrument practice
      "Recording",      // Studio work
      "Performance",    // Music shows, concerts, etc.
      "Rehearsal",      // Stage or dress rehearsal
      "Promotion",      // Interviews, fansigns, variety, etc.
      "Photoshoot",     // Magazine, merch, etc.
      "Video Shoot",    // Music videos, YouTube, etc.
      "Meeting",        // Staff, agency, producers
      "Event",          // Fan meetings, award shows
      "Medical",        // Checkups, therapy, etc.
      "Other"           // Anything uncategorized
    ]

  },
  short_description: { type: String, required: true},
  long_description: String,
  date: {type: String, required: true}, 
  task_id:{ type: String, required: true}
 
});
// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Task", taskSchema);