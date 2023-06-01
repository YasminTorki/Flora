const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
router.post("/login", UserAuthController.login);
router.post("/register", UserAuthController.register);
router.post("/addbasket", UserAuthController.addBasket);

module.exports = {
  UserAuthRoutes: router,
};
