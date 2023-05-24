const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    price : {type : Number, required : true},

    image : {type : String, required : true}

});
moduel.exports = {
    BlogModel : mongoose.model("cards", Schema)
}