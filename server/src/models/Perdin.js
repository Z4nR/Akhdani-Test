const { Schema, model } = require("mongoose");

const perdinSchema = new Schema({
  name: { type: String, required: true },
  note: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  fromCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  durationDay: { type: Number, required: true },
  status: { type: String, required: true },
});

const Perdin = model("akhdaniPerdins", perdinSchema, "akhdaniPerdins");

module.exports = Perdin;
