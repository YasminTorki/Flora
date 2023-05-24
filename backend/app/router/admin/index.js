const adminController = require("../../http/controllers/admin/admin.controller");
const router = require("express").Router();

router.get("/", adminController.indexPage);
router.post("/login", adminController.loginPage);
router.post("/addflower", adminController.addFlower);
module.exports = {
    AdminRoutes : router
}
