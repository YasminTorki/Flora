const {default: mongoose} = require ("mongoose");
const Schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId, ref: "user", required : true},
    title : {type : String, required : true},
    short_text : {type : String, required : true},
    text : {type : String, required : true},
    image : {type : String, required : true},
    tags : {type : [String], default : []},
    category : {type : mongoose.Types.ObjectId, ref: "category", required :true},
    comments : {type : [CommentSchema], default : []},
    likes : {type : [mongoose.Types.ObjectId], ref: "user", default : []},
    dislikes : {type : [mongoose.Types.ObjectId], ref: "user", default : []},
    bookmarks : {type : [mongoose.Types.ObjectId], ref: "user", default : []}
}, {
    timestamps : true, 
    versionKey : false,
    toJSON : {
        virtuals: true
    }
});
moduel.exports = {
    BlogModel : mongoose.model("blog", Schema)
}