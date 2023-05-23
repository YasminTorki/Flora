const adminController = require("../../http/controllers/admin/admin.controller");
const router = require("express").Router();

router.get("/", adminController.indexPage);
router.post("/login", adminController.loginPage);
router.post("/addflower", adminController.loginPage);
module.exports = {
    AdminRoutes : router
}
