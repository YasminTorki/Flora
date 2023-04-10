const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    title : {type : String},
    text : {type : String},
    image : {type : String, required : true},
    type : {type : String, default : "main"}
});
moduel.exports = {
    SliderModel : mongoose.model("slider", Schema)
}
