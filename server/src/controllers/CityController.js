const { rangeCount, moneyCounter } = require("../helpers/perdin_helpers");
const { cityValidate } = require("../helpers/validation");
const City = require("../models/City"),
  User = require("../models/User");

module.exports = {
  addCity: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { error } = cityValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const city = await City.findOne({ name: req.body.name });
      if (city) return res.status(409).send({ message: "City already exist!" });

      const lat = await City.findOne({ lat: req.body.lat });
      if (lat)
        return res
          .status(409)
          .send({ message: "Latitude Coordinate already exist!" });

      const long = await City.findOne({ long: req.body.long });
      if (long)
        return res
          .status(409)
          .send({ message: "Longitude Coordinate already exist!" });

      await new City(req.body).save();
      res.status(201).send({ message: "Add city data successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  updateCity: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { id } = req.params;

      const { error } = cityValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      await City.findByIdAndUpdate(id, req.body);

      res.status(202).send({ message: "City data updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getCityById: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { id } = req.params;

      const data = await City.findById(id);

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  deleteCity: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { id } = req.params;

      await City.deleteOne({ _id: id });

      res.status(200).send({ message: "City data deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getAllCity: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });

    try {
      const city = await City.find();

      res.status(200).send(city);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getRangeCity: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { fromCity } = req.body;
      const { destinationCity } = req.body;
      const { duration } = req.body;

      const fCity = await City.findOne({ name: fromCity });
      const dCity = await City.findOne({ name: destinationCity });

      const lat1 = fCity.lat;
      const long1 = fCity.long;
      const lat2 = dCity.lat;
      const long2 = dCity.long;

      const prov = fCity.province === dCity.province;
      const isle = fCity.island === dCity.island;
      const country = dCity.aboard;

      const range = rangeCount(lat1, lat2, long1, long2);
      const cost = moneyCounter(country, prov, isle, range, duration);

      res.status(200).send({
        range: `${range} KM`,
        total: cost.total,
        note: cost.note,
        money: cost.cost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
