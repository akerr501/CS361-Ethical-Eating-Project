// Authors: Adam Kerr


var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var mealData = require('./mealData.json');
var ingredientData = require('./ingredientData.json');
var userData = require('./userData.json')
var fs = require('fs');

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

app.get('/ingredients/:IDs', function(req, res, next) {
  console.log("Ingredients list page");
  var IDs = JSON.parse(req.params.IDs);
  ingredients = [];
  if (IDs.length != 0){
    for(var i = 0; i < IDs.length; i++){
      var temp = false;
      for (var k=0; k < ingredientData.length; k++) {
        if (IDs[i] == ingredientData[k].ID) {
          ingredients.push(ingredientData[k]);
          temp = true;
        }
      }
      if(!temp) res.status(400).send("Bad Ingredient ID");
    }
    if(temp){
      res.status(200);
      res.render('ingredientsPage', {
        INGREDIENTS: ingredients,
      });
    }
  }
  else res.status(400).send("No IDs found in the array")
})

app.get('*', function(req, res){
  console.log("Serving the 404 Page");
  res.status(404);
  res.render('404Page', {
  });
});

app.listen(port, function(){
  console.log("Server is listening on this port: ", port);
})
