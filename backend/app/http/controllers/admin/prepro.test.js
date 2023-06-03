const { addPrepProduct } = require("./admin.controller.js");
const { ProductModel } = require("../../../models/prep_products");
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
  let product = await ProductModel.findOne({ name: "test product" });
  if (product) {
    await ProductModel.deleteOne({ name: "test product" });
  }

  const req = {
    body: {
      name: "test product",
      price: 120,
      count: 12,
      desc: "test product description",
    },
  };
  // await req.save();
  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await addPrepProduct(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(res.status).not.toHaveBeenCalledWith(500);
  expect(res.status).not.toHaveBeenCalledWith(422);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    "success": true,
    "message": "عملیات موفقیت آمیز بود"
  });
});
