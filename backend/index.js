const { default: mongoose } = require("mongoose");
const Application=require("./app/server");
// new Application(5000,"mongodb+srv://yasmiintte:mz8jZUBf3fNT7f0m@cluster0.oxev70j.mongodb.net/?retryWrites=true&w=majority")
new Application(5000,"mongodb://localhost:27017/flora")