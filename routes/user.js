const { handleActiveUsers, handleAverageAge, handleFavoriteFuit, handleCountryBaseUser, handleAverageOfTag, handleInActiveUserDetails, handleInActiveUserWithTag, handleUserWithFavoritefruit, handleUserWithTwoTagValue,handleUserWithCompanyCountry,handleTestLookUp } = require("../controllers/user");

const route=require("express").Router();
route.get('/active',handleActiveUsers)
route.get('/age',handleAverageAge)
route.get('/favoritefruit',handleFavoriteFuit)
route.get('/country',handleCountryBaseUser)
route.get('/tag',handleAverageOfTag)
route.get('/activeuserdetais',handleInActiveUserDetails)
route.get('/activeuserwithtag/:tags',handleInActiveUserWithTag)
route.get('/favoritefrutewithuser',handleUserWithFavoritefruit)
route.get('/userwithtowtagvalue',handleUserWithTwoTagValue)
route.get('/userwithcompanycountry/:country',handleUserWithCompanyCountry)
route.get('/testlookup',handleTestLookUp)
module.exports=route