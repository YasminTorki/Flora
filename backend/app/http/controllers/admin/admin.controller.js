const Controller = require("../controller");
const { authSchema } = require("../../validators/user/auth.schema");
const createError = require("http-errors");
const { UserModel } = require("../../../models/users");
const { BoxModel } = require("../../../models/box");
const { CardModel } = require("../../../models/card");
const { FlowerModel } = require("../../../models/flowers");
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

      // return res.status(200).send("Admin Login Page Is Loaded");eaevfdz
    } catch (error) {
      next(error);
    }
  }

  async addPrepProduct(req, res, next) {
    try {
      const data = JSON.parse(req.body.properties);
      const name = data.name;
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

      const newPrepProduct = {
        name: data.name,
        discount: data.discount,
        type: data.type,
        price: data.price,
        image: req.file.originalname,
        desc: data.desc,
      };
      const upload = multer({ storage: storage }).single("file");

      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "upload failed",
          });
        }
        await ProductModel.create(newFlower);
        return res.status(200).json({
          success: true,
          message: "upload success",
        });
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePrepProduct(req, res, next) {
    try {
      const name = req.body.name;
      const flw = await ProductModel.deleteOne({ name });

      if (!flw.deletedCount) {
        return res.status(422).json({
          success: false,
          message: "عملیات حذف با موفقیت انجام نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "عملیات حذف موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  async addFlower(req, res, next) {
    try {
      const name = req.body.name;
      let flower = await FlowerModel.findOne({ name });

      if (flower) {
        return res.status(422).json({
          success: false,
          message: "این گل در دیتابیس ثبت شده است",
        });
      }

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "C:/Users/iranian/Desktop/Flora/backend/uploads");
        },

        filename: function (req, file, cb) {
          cb(null, Date.now() + "-" + file.originalname);
        },
      });
      const upload = multer({ storage: storage }).single("image");

      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        console.log(req.file);
        flower = await FlowerModel.create({
          name: req.body.name,
          color: req.body.color,
          image: req.file,
          count: req.body.count,
          price: req.body.price,
          desc: req.body.desc,
        });
      });

      if (flower !== null) {
        return res.status(422).json({
          success: false,
          message: "خطایی رخ داده است",
        });
      }

      return res.status(200).json({
        success: true,
        message: "عملیات موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFlower(req, res, next) {
    try {
      const name = req.body.name;
      const flower = await FlowerModel.deleteOne({ name });

      if (!flower.deletedCount) {
        return res.status(422).json({
          success: false,
          message: "عملیات حذف با موفقیت انجام نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "عملیات حذف موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  async addBox(req, res, next) {
    try {
      const name = req.body.name;
      let box = await BoxModel.findOne({ name });

      if (box) {
        return res.status(422).json({
          success: false,
          message: "این باکس در دیتابیس ثبت شده است",
        });
      }

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "C:/Users/iranian/Desktop/Flora/backend/uploads");
        },

        filename: function (req, file, cb) {
          cb(null, Date.now() + "-" + file.originalname);
        },
      });
      const upload = multer({ storage: storage }).single("image");

      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        console.log(req.file);
        box = await BoxModel.create({
          name: req.body.name,
          color: req.body.color,
          price: req.body.price,
          image: req.file,
          count: req.body.count,
          desc: req.body.desc,
        });
      });

      if (box !== null) {
        return res.status(422).json({
          success: false,
          message: "خطایی رخ داده است",
        });
      }

      return res.status(200).json({
        success: true,
        message: "عملیات موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBox(req, res, next) {
    try {
      const name = req.body.name;
      const box = await BoxModel.deleteOne({ name });

      if (!box.deletedCount) {
        return res.status(422).json({
          success: false,
          message: "عملیات حذف با موفقیت انجام نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "عملیات حذف موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  async addCard(req, res, next) {
    try {
      const name = req.body.name;
      let card = await CardModel.findOne({ name });

      if (card) {
        return res.status(422).json({
          success: false,
          message: "این کارت در دیتابیس ثبت شده است",
        });
      }

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "C:/Users/iranian/Desktop/Flora/backend/uploads");
        },

        filename: function (req, file, cb) {
          cb(null, Date.now() + "-" + file.originalname);
        },
      });
      const upload = multer({ storage: storage }).single("image");

      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        console.log(req.file);
        card = await CardModel.create({
          name: req.body.name,
          price: req.body.price,
          count: req.body.count,
          image: req.file,
          desc: req.body.desc,
        });
      });

      if (card !== null) {
        return res.status(422).json({
          success: false,
          message: "خطایی رخ داده است",
        });
      }

      return res.status(200).json({
        success: true,
        message: "عملیات موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCard(req, res, next) {
    try {
      const name = req.body.name;
      const crd = await CardModel.deleteOne({ name });

      if (!crd.deletedCount) {
        return res.status(422).json({
          success: false,
          message: "عملیات حذف با موفقیت انجام نشد",
        });
      }

      return res.status(200).json({
        success: true,
        message: "عملیات حذف موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

})();

