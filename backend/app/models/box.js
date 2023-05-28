const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    image : {type : String, required : true},
    count : {type : Number, required : true},
    price : {type : Number, required : true}


});
moduel.exports = {
    BlogModel : mongoose.model("box", Schema)
}