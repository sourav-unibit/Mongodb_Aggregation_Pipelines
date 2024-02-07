const mongoose=require("mongoose");
const author=new mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true,
    },
    birth_year:{
        type:Number,
        require:true,
    }
}) 
const Author=mongoose.model("author",author);
module.exports=Author;