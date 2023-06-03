const { addFlower } = require("./admin.controller.js");
const { FlowerModel } = require("../../../models/flowers");
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
  let product = await FlowerModel.findOne({ name: "test flower" });
  if (product) {
    await FlowerModel.deleteOne({ name: "test flower" });
  }

  const req = {
    body: {
      name: "test flower",
      color: "test color",
      count: 12,
      price: 120,
      desc: "test flower description",
    },
  };
  //   await req.save();
  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await addFlower(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(res.status).not.toHaveBeenCalledWith(500);
  expect(res.status).not.toHaveBeenCalledWith(422);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: "عملیات موفقیت آمیز بود",
  });
});
