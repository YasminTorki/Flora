const userController = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/addToBasket", userController.addToBasket);
router.post("/removeFromBasket", userController.removeFromBasket);

module.exports = {
  UserAuthRoutes: router,
};
