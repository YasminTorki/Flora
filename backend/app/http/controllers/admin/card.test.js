const { addCard, addFlower } = require("./admin.controller.js");
const { CardModel } = require("../../../models/card");
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
  let product = await CardModel.findOne({ name: "test card" });
  if (product) {
    await CardModel.deleteOne({ name: "test card" });
  }

  const req = {
    body: {
      name: "test card",
      price: 120,
      count: 12,
      desc: "test card description",
    },
  };
  // await req.save();
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
