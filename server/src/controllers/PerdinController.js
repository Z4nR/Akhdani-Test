const { perdinValidate } = require("../middleware/validation");
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
};
