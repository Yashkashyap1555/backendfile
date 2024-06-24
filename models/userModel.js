const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
    }, 
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const newSchema = mongoose.model("user", userSchema);
module.exports = newSchema;
