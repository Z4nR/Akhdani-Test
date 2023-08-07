const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = model("akhdaniUsers", userSchema, "AkhdaniUsers");

module.exports = User;
