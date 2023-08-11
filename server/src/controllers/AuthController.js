const jwt = require("jsonwebtoken");

module.exports = {
  authJWT: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader && authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
          console.log(err);
          const data = "Invalid Token Structure";
          return res.status(403).send({ data: data });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401);
    }
  },
};
