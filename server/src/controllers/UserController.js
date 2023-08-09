const { registValidate, loginValidate } = require("../helpers/validation");
const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

module.exports = {
  registerAcc: async (req, res) => {
    try {
      const { error } = registValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const email = await User.findOne({ email: req.body.email });
      if (email)
        return res.status(409).send({ message: "Email already exist!" });

      const username = await User.findOne({ username: req.body.username });
      if (username)
        return res.status(409).send({ message: "Username already exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({
        ...req.body,
        password: hashPassword,
      }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  loginAcc: async (req, res) => {
    try {
      const { error } = loginValidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(401).send({ message: "Invalid Username!" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Password!" });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });

      res.status(200).send({ token: token, message: "Logged in successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  dataAcc: async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });

    if (!user) return res.status(401).send({ message: "Invalid User!" });

    try {
      const data = {
        name: user.name,
        role: user.role,
      };

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).send({ error: "Pengguna tidak ditemukan." });
      }

      const id = user._id;

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(password, salt);

      await User.findByIdAndUpdate(id, { password: hashPassword });

      res.status(202).send({ message: "Password change successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
