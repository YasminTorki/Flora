const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    flower_ID : {type : Number, required : true},
    box_ID : {type : Number, required : true},
    card_ID : {type : Number, required : true},
    price : {type : Number, required : true},



});
moduel.exports = {
    categoryModel : mongoose.model("custom_basket", Schema)
}