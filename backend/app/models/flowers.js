const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    name : {type : String, required : true},
    color : {type : String, required : true},
    image : {type : String, required : true},
    count : {type : Number, required : true},
    price : {type : Number, required : true}

});
moduel.exports = {
    BlogModel : mongoose.model("flowers", Schema)
}