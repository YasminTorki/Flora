const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true, unique: true },
  tprice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  count: { type: Number, required: true },
  desc: { type: String, required: true },
  flowerid: { type: mongoose.Types.ObjectId },
});
module.exports = {
  OrderModel: mongoose.model("order", Schema),
};
