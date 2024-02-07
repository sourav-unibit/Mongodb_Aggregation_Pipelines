const Book = require("../model/book")
const User = require("../model/user")

const handleActiveUsers=async(req,res)=>{
    try{
    //    const data=await User.find({isActive:true});
    //    res.status(200).json({data:data.length}) 

    // -----------aggregation part-----------------
    const data= await User.aggregate([
        {
            $match:{isActive:true}
        },
        {
            $count:"activeUsers"
        }
    ])
    const {activeUsers}=data[0]
    console.log(data)
       res.status(200).json({activeUsers}) 

    }catch(error){
        console.log("error form handleActiveUsers",error)
        res.status(200).json({message:"somthing wrong..."})
    }
}
const handleAverageAge=async(req,res)=>{
    try{
        const data=await User.aggregate([
            {
                $group:{
                _id:null,
                averageOfUserAge:{
                    $avg:"$age"
                }
            }}
        ])
        res.status(200).json({data})
    }catch(error){
        console.log("error from handleAverageAge--->",error)
        res.json(500).json({message:"somthing wrong..."})
    }
}

const handleFavoriteFuit=async(req,res)=>{
    try{
        const data=await User.aggregate([
            {
                $group: {
                    _id: "$favoriteFruit",
                   count:{
                  $sum:1
                }
              }
            },
            {
              $sort: {
                count: 1
              }
            },
            {
              $limit: 1
            }
          ])
        res.status(200).json({data})
}catch(error){
    console.log("error from handleFavoriteFuit--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}
const handleCountryBaseUser=async(req,res)=>{
  try{
    const data=await User.aggregate([
        {
            $group:{
                _id:"$company.location.country",
                useCount:{
                    $sum:1,
                }
            }
        },
        {
            $sort:{
                useCount:-1
            }
        },
        {
            $limit:3
        }
    ])
    res.status(200).json({data})

}catch(error){
    console.log("error from handleCountryBaseUser--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}
const handleAverageOfTag=async(req,res)=>{
    try{
        //three line aggregate Pipeline
        // const data=await User.aggregate([
        //     {
        //       $unwind:{
        //         path:"$tags"
        //       }
        //     },
        //     {
        //       $group:{
        //         _id:"$_id",
        //         count:{
        //           $sum:1
        //         }
        //       }
        //     },{
        //       $group:{
        //         _id:null,
        //         average:{
        //           $avg:"$count"
        //         }
        //       }
        //     }
        //   ])
        //two line aggregate pipeline
        const data=await User.aggregate([
            {
              $addFields: {
                sizeOfTag: {
                  $size:{$ifNull:["$tags",[]]} // it's the syntex of handle if tage key is not present in mongodb
                }
              },
            },{
                $group:{
                _id:null,
                average:{
                  $avg:"$sizeOfTag"
                }
              }
            }
          ])
        res.status(200).json({data})
    }catch(error){
        console.log("error from handleAverageOfTag--->",error)
        res.json(500).json({message:"somthing wrong..."})
    }
}
const handleInActiveUserDetails=async(req,res)=>{
try{
const data=await User.find({isActive:false}).select("name age");
// const data=await User.aggregate(
//     [
//         {$match:{
//             isActive:false,
//             tags:"velit",
//         }},
//         {
//             $project:{
//                 name:1,
//                 age:1,
//             }
//         }
//     ]
// )
res.status(200).json({data});
}catch(error){
    console.log("error from handleInActiveUserDetails--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}
const handleInActiveUserWithTag=async(req,res)=>{
    try{
        const {tags}=req.params;
        const data=await User.aggregate([
            {$match: {
            isActive:false,
            tags,
          }
          },{
              $project: {
                name:1,
                age:1,
                _id:0,
              }
          }
           
          ])
          res.status(200).json({data})

}catch(error){
    console.log("error from handleInActiveUserWithTag--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}
const handleUserWithFavoritefruit=async(req,res)=>{
    try{
const data=await User.aggregate([
    {$group:{
        _id:"$favoriteFruit",
        userData:{
            $push:"$name"
        }
    }},

])
res.status(200).json({data})
}catch(error){
    console.log("error from handleUserWithFavoritefruit--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}
const handleUserWithTwoTagValue=async(req,res)=>{
    try{
        const {first,second}=req.query;
        const data=await User.aggregate([{
            $match:{
                tags:{$all:[first,second]},
            }
        }])
        res.status(200).json({data})
}catch(error){
    console.log("error from handleActiveUsers--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}
const handleUserWithCompanyCountry=async(req,res)=>{
    const {country}=req.params;
    try{
        const data=await User.aggregate([
            {
                $match:{
                    "company.location.country":{ $regex: new RegExp('^' + country + '$', 'i') }
                    
                }
            },
            {
                $group:{
                    _id:"$company.title",
                    userCount:{$sum:1}
                }
            }
        ])
        res.status(200).json({data})
}catch(error){
    console.log("error from handleActiveUsers--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}
const handleTestLookUp=async(req,res)=>{
    try{
  
        const data=await Book.aggregate([
            {
           $lookup: {
             from: "authors",
             localField: "author_id",
             foreignField: "_id",
             as: "author_details"
           }
            },
           {
             $addFields:{
               author_details:{
                 $arrayElemAt:["$author_details",0] //$first:"$author_details"   another approach
               }
             }
           },
           {
            $project:{
                title:1,
                genre:1,
                author_id:1,
                author_details:{
                    name:1,
                    birth_year:1
                }
            }
           }
         ])
        res.status(200).json({data})

}catch(error){
    console.log("error from handleTestLookUp--->",error)
    res.json(500).json({message:"somthing wrong..."})
}
}

module.exports={handleActiveUsers,handleAverageAge,handleFavoriteFuit,handleCountryBaseUser,handleAverageOfTag,handleInActiveUserDetails,handleInActiveUserWithTag,handleUserWithFavoritefruit,handleUserWithTwoTagValue,handleUserWithCompanyCountry,handleTestLookUp}
// try{

// }catch(error){
//     console.log("error from handleActiveUsers--->",error)
//     res.json(500).json({message:"somthing wrong..."})
// }