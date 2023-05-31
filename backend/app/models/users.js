const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true, required: true },
  Lastname: { type: String, required: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  Role: { type: String, default: "USER" },
});

module.exports = {
  UserModel: mongoose.model("user", Schema),
};
