const mongoose=require("mongoose");
const User = require("./model/user");
const express=require("express")
const userRoute=require("./routes/user");
const usersData = require("./json/userData");
const authorsData = require("./json/authorData");
const booksData = require("./json/bookData");
const Author = require("./model/author");
const Book = require("./model/book");

const app=express();
require("dotenv").config()
const MONGODB_URL=process.env.MONGODB_URL

mongoose.connect(MONGODB_URL).then(()=>{
    console.log("mongodb connecting successfuly");
}).catch(()=>{
    console.log("mongodb connection error");
})
app.use('/',userRoute)

const insertData=async()=>{
  try{
    await  User.insertMany(
      usersData
      )
      await Author.insertMany(
        authorsData
      )
      await Book.insertMany(booksData)
      console.log('successfully data push in mongodb');
  }catch(error){
    console.log("error from insertData",error)
    console.log("error from insertData",error)
  }
    
}
app.listen("4000",(err)=>{
    if(!err){
        console.log("server connecting successfully")
    }
})
// insertData()