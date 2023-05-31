const Controller = require("../controller");
const { authSchema } = require("../../validators/user/auth.schema");
const createError = require("http-errors")
module.exports = new (class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(200).send("index page store");
    } catch (error) {
      next(error);
    }
  }

  async getHomePage(req, res, next) {
    try {
      const user = {
        name: 'Samin',
        family: 'Saei',
        username: 'SSaei',
        userId: 12,
      };
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
})();
