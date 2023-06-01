const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  image: { type: String, required: true },
  desc: { type: String },
});
module.exports = {
  CardModel: mongoose.model("cards", Schema),
};
