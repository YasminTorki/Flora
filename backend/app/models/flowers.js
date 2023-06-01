const string = require("@hapi/joi/lib/types/string");
const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
});
module.exports = {
  FlowerModel: mongoose.model("flowers", Schema),
};
