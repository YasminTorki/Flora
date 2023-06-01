const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
router.post("/login", UserAuthController.login);
router.post("/register", UserAuthController.register);
router.post("/addToBasket", UserAuthController.addToBasket);
router.post("/removeFromBasket", UserAuthController.removeFromBasket);

module.exports = {
  UserAuthRoutes: router,
};
