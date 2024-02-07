const mongoose=require("mongoose");
const user=new mongoose.Schema({
    
        index:{
            type:Number,
            require:true,
        },
        age:{
            type:Number,
            require:true,
        },
        name:{
            type:String,
            require:true,
        },
        gender:{
            type:String,
            require:true,
        },
        eyeColor:{
            type:String,
            require:true,
        },
        favoriteFruit:{
            type:String,
            require:true,
        },
        favoriteFruit:{
            type:String,
            require:true,
        },
        company:{
            type:Object,
            require:true,
        },
        isActive:{
            type:Boolean,
            require:true,
        },
        registered:{
            type:Date,
            require:true,
        },
        tags:{
            type:Array,
            require:require
        }
       
})
const User=mongoose.model("user",user)
module.exports=User;