const router = require("express").Router();
const { AllRoutes } = require("./api");
const { UserAuthRoutes } = require("./users/auth");
router.use("/user", UserAuthRoutes)
router.use("/", AllRoutes)
module.exports = {
    AllRoutes : router
}