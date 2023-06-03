const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: Buffer },
  category: { type: mongoose.Types.ObjectId},
  count: { type: Number, required: true },
  type: { type: [String] },
  desc: { type: String },
});
module.exports = {
  ProductModel: mongoose.model("Prep_products", Schema),
};
