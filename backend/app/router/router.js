const router = require("express").Router();
const { AllRoutes } = require("./api");
const { AdminRoutes } = require('./admin');
const { UserAuthRoutes } = require("./users/auth");
router.use("/user", UserAuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/", AllRoutes);
module.exports = {
    AllRoutes : router
}