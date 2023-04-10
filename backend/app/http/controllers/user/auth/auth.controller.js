const createError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");
const { UserModel } = require("../../../../models/users");
class UserAuthController {

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email, password });
      if (!user) {
        const message = {
          isOk: false,
          message: "این کاربر یافت نشد",
        };
        return res.status(422).json(message);
      }

      return res
        .status(200)
        .json({ isOk: true, message: "ورود موفقتیت آمیز بود" });
    } catch (error) {
      next(createError.BadRequest(error.message));
    }

  }

  async register(req, res, next) {
    const result = authSchema.validate(req.body);

    if (result.error) {
      const array = [];
      result.error.details?.forEach((e) => array.push(e.message));
      return res.status(422).json({ isOk: false, messages: array });
    }

    try {
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        const message = {
          isOk: false,
          message: "این ایمیل از قبل ثبت نام شده است",
        };
        return res.status(422).json(message);
      }
      user = await UserModel.create(req.body);
      return res.status(200).json({
        isOk: true,
        message: "ثبت نام با موفقیت انجام شد",
      });
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
  
}
module.exports = {
  UserAuthController: new UserAuthController(),
};
