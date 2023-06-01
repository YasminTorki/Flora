// const { describe } = require("@hapi/joi/lib/base.js");
// const { describe } = require("jest");
const { loginPage } = require("./admin.controller.js");
const { UserModel } = require("../../../models/users");
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

test("valid email and password so login should be successful", async () => {
  let user = await UserModel.findOne({ email: "test@gmail.com" });
  if (user) {
    await UserModel.deleteOne({ email: "test@gmail.com" });
  }

  const testUser = new UserModel({
    name: "test",
    Lastname: "testi",
    email: "test@gmail.com",
    password: "testtest",
    Role: "admin",
  });
  await testUser.save();

  const req = {
    body: { email: "test@gmail.com", password: "testtest" },
  };
  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await loginPage(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    isLoggedin: true,
    name: user.name,
    lastname: user.Lastname,
    email: user.email,
    role: user.Role,
  });
  expect(next).not.toBeCalled();
});

test("invalid email and password so login should fail", async () => {
  const req = {
    body: { email: "invalid@gmail.com", password: "invalidpassword" },
  };
  const res = { send: jest.fn(), status: jest.fn(() => res), json: jest.fn() };
  const next = jest.fn();

  await loginPage(req, res, next);

  expect(res.send).not.toHaveBeenCalled();
  expect(next).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: "username or password is wrong",
  });
});

