const { required } = require("@hapi/joi");
const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String },
  count: { type: Number, required: true }, 
  desc: { type: String }
});

module.exports = {
  BoxModel: mongoose.model("box", Schema),
};
