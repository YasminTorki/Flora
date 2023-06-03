// const { describe } = require("@hapi/joi/lib/base.js");
// const { describe } = require("jest");
const { register } = require("./auth.controller");
const { UserModel } = require("../../../../models/users");
const { default: mongoose } = require("mongoose");
// const { required } = require("@hapi/joi");

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://localhost:27017/flora", {
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("valid email and password so user login should be successful", async () => {
  let user = await UserModel.findOne({ email: "testuser@gmail.com" });
  if (user) {
    await UserModel.deleteOne({ email: "testuser@gmail.com" });
  }
  user = await UserModel.findOne({ name: "testuser" });
  if (user) {
    await UserModel.deleteOne({ email: "testuser" });
  }

  const req = {
    body: {
      name: "testuser",
      Lastname: "testuseri",
      email: "testuser@gmail.com",
      password: "testuser",
    },
  };

  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await register(req, res, next);

  expect(next).not.toBeCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.any(String),
    })
  );

  user = await UserModel.findOne({ email: "testuser@gmail.com" });
  if (user) {
    await UserModel.deleteOne({ email: "testuser@gmail.com" });
  }
});

test("invalid email and password so user login should fail", async () => {
  const req = {
    body: {
      name: "testuser",
      Lastname: "testuseri",
      email: "mamad@gmail.com",
      password: "testuser",
    },
  };
  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await register(req, res, next);

  expect(res.status).not.toHaveBeenCalledWith(200);
  expect(next).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(422);
  expect(res.json).toHaveBeenCalledWith({
    isOk: false,
    message: "این ایمیل از قبل ثبت نام شده است",
  });
});
