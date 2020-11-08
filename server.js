// Authors: Adam Kerr


var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var mealData = require('./mealData.json');
var ingredientData = require('./ingredientData.json');
var userData = require('./userData.json')
var fs = require('fs');
var helper = require('./modules/helper.js');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exp_handle({ defualtLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));


app.get('/', function(req, res, next) {
  console.log("Serving the Home Page");
  res.status(200);
  res.render("indexPage", {

  });
});


//req is going to be the user id maybe idk
app.get('/saved', function(req, res, next) {
  console.log("Serving the Saved Recipes Page");

  var context = {};

  //this is wrong, bc uhhhh i think it is
  //var userIdNum = req.params.id;
  var userIdNum = "0";
  context.userInfo = userData[userIdNum];
  var recipeID;
  context.savedRecipes = [];


  for(var i in context.userInfo.Recipes){
    recipeID = context.userInfo.Recipes[i];
    //adding the meal objects to the context???
    context.savedRecipes[i] = {"meal": mealData[recipeID]};
  }

  res.status(200);
  res.render("savedPage", context);
  // res.render("savedPage");
});

app.get('/search', function(req, res, next) {
  console.log("serving search results");
  helper.search(req, res, next, ingredientData, mealData);
});

app.get('/browse', function(req, res, next) {
  console.log("Serving the Browse Page");
  var context = {};
  context.ingredients= ingredientData;
  context.meals = mealData;
  res.status(200);
  res.render("browsePage", context);
});

app.get('/meal', function(req, res, next){
  console.log("serving meal page");
  context = {};
  helper.mealPage(req, res, next, ingredientData, mealData);  
});

app.get('/login', function(req, res, next) {
  console.log("Serving the Login Page");
  res.status(200);
  res.render("loginPage", {

  });
});

app.get('/signup', function(req, res, next) {
  console.log("Serving the Sign Up Page");
  res.status(200);
  res.render("signupPage", {

  });
});

app.get('*', function(req, res){
  console.log("Serving the 404 Page");
  res.status(404);
  res.render('404Page', {
  });
});

app.listen(port, function(){
  console.log("Server is listening on this port: ", port);
})
