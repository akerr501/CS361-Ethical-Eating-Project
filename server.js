// Authors: Adam Kerr


var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var mealData = require('./mealData');
var ingredientData = require('./ingredientData');
var userData = require('./userData')
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exp_handle({ defualtLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));

const search = (req, res, next) => {
  var context = {};
  context.meals = [];
  context.ingredients = [];
  context.search = req.query.q;
  var search = context.search.toLowerCase();
  var meal = mealData;
  var ing = ingredientData;
  for (i in ing){
    if (ing[i].Name.toLowerCase().includes(search)){
      context.ingredients.push(ing[i]);
    }
  }
  for (j in meal){
    if (meal[j].Name.toLowerCase().includes(search)){
      context.meals.push(meal[j]);
    }
  }
  console.log(context);
  res.status(200);
  res.render("searchPage", context);

} 

const mealPage = (req, res, next) => {
  var context = {};
  context.meal = {};
  context.ingredient = {};
  var ID = req.query.ID;
  context.meal.Name = mealData[ID].Name;
  context.meal.er = mealData[ID].Rating;
  var ingredients = [];
  ingredients = mealData[ID].Ingredients;
  for (i in ingredients){
    context.ingredient[i] = {"Name" : ingredientData[ingredients[i]].Name,
      "Rating" : ingredientData[ingredients[i]].Rating};
  }
  console.log(context.meal);
  console.log(context.ingredient);
  res.render("mealPage", context);
}

app.get('/', function(req, res, next) {
  console.log("Serving the Home Page");
  res.status(200);
  res.render("indexPage", {

  });
});

app.get('/build', function(req, res, next) {
  console.log("Serving the Build Recipe Page");
  res.status(200);
  res.render("buildPage", {

  });
});

app.get('/saved', function(req, res, next) {
  console.log("Serving the Saved Recipes Page");
  res.status(200);
  res.render("savedPage", {

  });
});

app.get('/search', function(req, res, next) {
  console.log("serving search results");
  search(req, res, next);
});

app.get('/browse', function(req, res, next) {
  console.log("Serving the Browse Page");
  var context = {};
  context.ingredients= ingredientData;
  console.log(context);
  res.status(200);
  res.render("browsePage", context);
});

app.get('/meal', function(req, res, next){
  console.log("serving meal page");
  context = {};
  mealPage(req, res, next);  
});

//app.get('/ingredient', function(req, res, next){
//  console.log("Serving Ingredient detail page");
//  var context = {};
//  let parsedQs = querystring.parse(parsedUrl.query);
//  context.ingredient = parsedQs;
//});

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
