const adminController = require("../../http/controllers/admin/admin.controller");
const router = require("express").Router();
const multer = require("multer");


router.get("/", adminController.indexPage);
router.post("/login", adminController.loginPage);
router.post("/addPrepProduct", adminController.addPrepProduct);
router.post("/deletePrepProduct", adminController.deletePrepProduct);
router.post("/addBox", adminController.addBox);
router.post("/deleteBox", adminController.deleteBox);
router.post("/addCard", adminController.addCard);
router.post("/deleteCard", adminController.deleteCard);
router.post("/addFlower", adminController.addFlower);
router.post("/deleteFlower", adminController.deleteFlower);

module.exports = {
  AdminRoutes: router,
};
