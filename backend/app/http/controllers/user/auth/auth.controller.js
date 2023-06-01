const createError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");
const { UserModel } = require("../../../../models/users");
const { OrderModel } = require("../../../../models/order");
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

  async addToBasket(req, res, next) {
    try {
      console.log(req.body);
      const order = {
        userid: req.body.userid,
        name: req.body.name,
        count: req.body.count,
        tprice: req.body.tprice,
        desc: req.body.desc,
        flowerid: req.body.flowerid,
      };

      let flower = await OrderModel.findOne({ flowerid: req.body.flowerid });
      if (flower) {
        const message = {
          isOk: false,
          message: "این محصول در سبد خرید شما قرار دارد.",
        };
        return res.status(422).json(message);
      }

      const ord = await OrderModel.create(order);
      return res.status(200).json({
        isOk: true,
        message: "محصول به سبد خرید شما اضافه شد.",
      });
    } catch (error) {
      // next(error);
      next(createError.BadRequest(error.message));
    }
  }

  async removeFromBasket(req, res, next) {
    try {
      const flowerid = req.body.flowerid;
      const box = await OrderModel.deleteOne({ flowerid });

      if (!box.deletedCount) {
        return res.status(422).json({
          success: false,
          message: "عملیات حذف از سبر خرید موفقیت آمیز نبود.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "محصول با موفقیت از سبد خرید حذف شد.",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
