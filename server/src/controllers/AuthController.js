const jwt = require("jsonwebtoken");

module.exports = {
  authJWT: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader && authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
          return res.status(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401);
    }
  },
};
