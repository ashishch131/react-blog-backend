const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
  
    },
    categories: {
      type: Array,
    
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
