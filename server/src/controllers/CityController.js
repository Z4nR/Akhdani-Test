const { cityValidate } = require("../middleware/validation");
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
};
