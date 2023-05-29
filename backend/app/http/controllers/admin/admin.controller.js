const Controller = require("../controller");
const { authSchema } = require("../../validators/user/auth.schema");
const createError = require("http-errors");
const { UserModel } = require("../../../models/users");
const { ProductModel } = require("../../../models/prep_products");
const multer = require("multer");

module.exports = new (class AdminController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(401).json({
        success: false,
        message: "This page is not accessible with get method",
      });
    } catch (error) {
      next(error);
    }
  }

  async loginPage(req, res, next) {
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "username or password is wrong",
        });
      }

      if (user.Role === "USER") {
        return res.status(401).json({
          success: false,
          message: "You are not admin",
        });
      } else {
        return res.status(200).json({
          success: true,
          isLoggedin: true,
          name: user.name,
          lastname: user.Lastname,
          email: user.email,
          role: user.Role,
        });
      }

      // return res.status(200).send("Admin Login Page Is Loaded");
    } catch (error) {
      next(error);
    }
  }

  async addpreparedFlower(req, res, next) { //برای اضافه کردن گل های اماده هست
    try {
      const name = req.body.name;
      let flower = await ProductModel.findOne({ name });

      if (flower) {
        return res.status(422).json({
          success: false,
          message: " این گل قبلا در دیتابیس ثبت شده است",
        });
      }
      let filename = null;
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "C:/Users/Assist/Desktop/floraMay28/Flora/backend/uploads");
        },

        filename: function (req, file, cb) {
          filename = Date.now() + "-" + file.originalname;
          cb(null, filename);
        },
      });
      const upload = multer({ storage: storage }).single("file");

      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: 'upload failed',
          });
        }

        return res.status(200).json({
          success: true,
          message: 'upload success',
        });

      });

    } catch (error) {
      next(error);
    }
  }
  
  async deleteFlower(req, res, next) {
    try {
      const name = req.body.name;
      const flw = await ProductModel.deleteOne({ name });

      if (!flw.deletedCount) {
        return res.status(200).json({
          success: false,
          message: 'عملیات حذف با موفقیت انجام نشد',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'عملیات حذف موفقیت آمیز بود',
      });
    } catch (error) {
      next(error);
    }

  }
})();
