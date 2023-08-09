const { Schema, model } = require("mongoose");

const citySchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  province: { type: String, required: true },
  island: { type: String, required: true },
  aboard: { type: Boolean, required: true },
});

const City = model("akhdaniCitys", citySchema, "akhdaniCitys");

module.exports = City;
