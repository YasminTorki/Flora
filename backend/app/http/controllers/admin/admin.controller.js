const Controller = require("../controller");
const { authSchema } = require("../../validators/user/auth.schema");
const createError = require("http-errors");
const { UserModel } = require("../../../models/users");
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

  async addFlower(req, res, next) {
    try {
      
    } catch (error) {}
  }
})();
