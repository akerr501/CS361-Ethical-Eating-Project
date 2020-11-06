// Authors: Adam Kerr


var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var mealData = require('./mealData.json');
var ingredientData = require('./ingredientData.json');
var userData = require('./userData.json')
var fs = require('fs');
const { isContext } = require('vm');

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

var hbs = exp_handle.create({
    helpers: {
      addInput: function () {
        getElementById('ingredient-box').innerHTML += 'works';
      }
    }
})

app.get('/build', function(req, res, next) {
  console.log("Serving the Build Recipe Page");
  var context = {};
  context.ingred = ingredientData; 
  res.status(200);
  res.render("buildPage", context)
});

app.get('/buildEdit/:id', function(req, res, next) {
  console.log("Serving the Build Recipe Page");
  var context = {};
  context.recipe = [];
  console.log(req.params.id);
  var id = req.params.id; 
  var recipeID;
  //grab recipe by ingredient ids and store in object recipe = [{}]
  context.ingred = ingredientData; 
  for (var i=0; i < mealData.length; i++) {
    if (id == mealData[i].ID) {
      recipeID = mealData[i].Ingredients;
      context.meal = mealData[i];
    }
  }
  
  for (var j=0; j < recipeID.length; j++) {
    for (var k=0; k < ingredientData.length; k++) {
      if (recipeID[j] == ingredientData[k].ID) {
        context.recipe.push(ingredientData[k]);
      }
    }
  }

  res.status(200);
  res.render("buildPageEdit", context)
});

app.get('/saved', function(req, res, next) {
  console.log("Serving the Saved Recipes Page");
  res.status(200);
  res.render("savedPage", {

  });
});

app.get('/browse', function(req, res, next) {
  console.log("Serving the Browse Page");
  res.status(200);
  res.render("browsePage", {

  });
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

