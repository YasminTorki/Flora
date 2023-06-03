const { addToBasket } = require("./auth.controller");
const { UserModel } = require("../../../../models/users");
const { OrderModel } = require("../../../../models/order");
const { default: mongoose } = require("mongoose");
const { Types } = require("mongoose");

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://localhost:27017/flora", {
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("valid user gunna order a valid product so this should be successful", async () => {
  let oldorder = await OrderModel.findOne({
    userid: "64770f2e3ab745a7eee046f2",
    flowerid: "64786c81aa6c80922662fd92",
  });
  if (oldorder) {
    await OrderModel.deleteOne({
      userid: "64770f2e3ab745a7eee046f2",
      flowerid: "64786c81aa6c80922662fd92",
    });
  }

  const req = {
    body: {
        userid: "64770f2e3ab745a7eee046f2",
        name: "test",
        count: 12,
        tprice: 23,
        desc: "testuser",
        flowerid: "64786c81aa6c80922662fd92",
    },
  };

  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await addToBasket(req, res, next);

  expect(next).not.toBeCalled();
  expect(res.status).not.toHaveBeenCalledWith(422);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    isOk: true,
    message: "محصول به سبد خرید شما اضافه شد.",
  });
});
