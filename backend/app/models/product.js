const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    name : {type : String, required : true},
    price : {type : Number, required : true},
    discount : {type : Number, default : 0},
    image : {type : [String], required : true},
    category : {type : mongoose.Types.ObjectId, required :true},
    count : {type : Number, required : true},
    type : {type : String, required : true},
    desc : {type : String, required : true},
    size : {type : Object, default : {
        
    }},
});
moduel.exports = {
    ProductModel : mongoose.model("product", Schema)
}
