const string = require("@hapi/joi/lib/types/string");
const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  image: { type: String },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  desc: { type: String },
});
module.exports = {
  FlowerModel: mongoose.model("flowers", Schema),
};
