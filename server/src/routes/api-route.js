const router = require("express-promise-router")();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const CityController = require("../controllers/CityController");
const PerdinController = require("../controllers/PerdinController");

//User Router
router.route("/user/regist").post(UserController.registerAcc);
router.route("/user/login").post(UserController.loginAcc);
router.route("/user/me").get(AuthController.authJWT, UserController.dataAcc);
router
  .route("/user/forget-password/:email")
  .patch(UserController.forgotPassword);

//City Router
router.route("/city/add").post(AuthController.authJWT, CityController.addCity);
router
  .route("/city/update/:id")
  .patch(AuthController.authJWT, CityController.updateCity);
router
  .route("/city/delete/:id")
  .delete(AuthController.authJWT, CityController.deleteCity);
router
  .route("/city/data/:id")
  .get(AuthController.authJWT, CityController.getCityById);
router
  .route("/city/data")
  .get(AuthController.authJWT, CityController.getAllCity);
router
  .route("/city/range")
  .post(AuthController.authJWT, CityController.getRangeCity);

//Perdin Router
router
  .route("/perdin/create")
  .post(AuthController.authJWT, PerdinController.createPerdin);
router
  .route("/perdin/:name/data")
  .get(AuthController.authJWT, PerdinController.getPerdinByName);
router
  .route("/perdin/data")
  .get(AuthController.authJWT, PerdinController.getAllPerdin);
router
  .route("/perdin/:id")
  .get(AuthController.authJWT, PerdinController.getPerdinById);

module.exports = router;
