const adminController = require("../../http/controllers/admin/admin.controller");
const router = require("express").Router();
const multer = require("multer");


router.get("/", adminController.indexPage);
router.post("/login", adminController.loginPage);
router.post("/addpreparedFlower", adminController.addpreparedFlower);
router.post("/deleteFlower", adminController.deleteFlower);

module.exports = {
  AdminRoutes: router,
};
