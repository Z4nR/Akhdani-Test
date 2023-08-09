const { perdinValidate } = require("../helpers/validation");
const Perdin = require("../models/Perdin"),
  User = require("../models/User");

module.exports = {
  createPerdin: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role !== "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { error } = perdinValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      await new Perdin(req.body).save();

      res.status(201).send({ message: "Perjalanan Dinas Created" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  updatePerdin: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { id } = req.params;
      const { status } = req.body;

      await Perdin.findByIdAndUpdate(id, { status: status });

      res.status(202).send({ message: "Perdin already processed" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getPerdinByName: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role !== "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { name } = req.params;

      const perdin = await Perdin.find({ name: name });

      res.status(200).send(perdin);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getPerdinById: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const { id } = req.params;

      const perdin = await Perdin.findById(id);

      res.status(200).send(perdin);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getAllPerdin: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });
    if (user.role === "Pegawai")
      return res.status(401).send({ message: "Invalid Role!" });

    try {
      const perdin = await Perdin.find();

      res.status(200).send(perdin);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
