const mongoose=require("mongoose");
const book=new mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    title:{
        type:String,
        require:true,
    },
    genre:{
        type:String,
        require:true,
    },
    author_id:{
        type:Number,
        require:true,
    }
}) 
const Book=mongoose.model("book",book);
module.exports=Book;