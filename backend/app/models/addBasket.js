const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    userid : {type : string, required : true},
    name : {type : string, required : true},
    count : {type : Number, required : true},
    tprice : {type : Number, required : true}
});
moduel.exports = {
    BlogModel : mongoose.model("addBasket", Schema)
}
 