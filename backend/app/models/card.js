const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  count: { type: Number, required: true },
  desc: { type: Number },
});
module.exports = {
  CardModel: mongoose.model("cards", Schema),
};
