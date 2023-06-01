const { date } = require("@hapi/joi/lib/template");
const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    OrderID : {type : Number, required : true},
    Type : {type : Number, required : true},
    Deadline : {type : String, required : true},
    price : {type : Number, required : true},
});

module.exports = {
    categoryModel : mongoose.model("custom_basket", Schema)
}