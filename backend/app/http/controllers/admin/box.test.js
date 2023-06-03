const { addBox } = require("./admin.controller.js");
const { BoxModel } = require("../../../models/box");
const { default: mongoose } = require("mongoose");

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://localhost:27017/flora", {
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("valid information so upload should be successful", async () => {
  let product = await BoxModel.findOne({ name: "test box" });
  if (product) {
    await BoxModel.deleteOne({ name: "test box" });
  }

  const req = {
    body: {
      name: "test box",
      price: 120,
      count: 12,
      desc: "test box description",
    },
  };
//   await req.save();
  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await addBox(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(res.status).not.toHaveBeenCalledWith(500);
  expect(res.status).not.toHaveBeenCalledWith(422);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: "عملیات موفقیت آمیز بود",
  });
});
