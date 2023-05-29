const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: Buffer, required: false },
  category: { type: mongoose.Types.ObjectId, required: false },
  count: { type: Number, required: true },
  type: { type: [String], required: true },
  desc: { type: String, required: true },
});
module.exports = {
  ProductModel: mongoose.model("Prep_products", Schema),
};
