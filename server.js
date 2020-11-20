// Authors: Adam Kerr

var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var mealData = require('./mealData.json');
var ingredientData = require('./ingredientData.json');
var userData = require('./userData.json')
var fs = require('fs');
const { isContext } = require('vm');
var helper = require('./modules/helper.js');
var saved = require('./modules/saved.js');


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

//Route to get ingredients
app.get('/ingredientData', function(req, res, next) {
  console.log("transmitting ingredient data");
  console.log(ingredientData);
  res.status(200)
  res.json({ingredientData});
});

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
  //current url syntax: http://localhost:3000/saved/?ID=0&userID=1

  var context = {};
  saved.getInfo(req, res, next, ingredientData, mealData, userData);
  // res.render("savedPage");
});

app.get('/meal', function(req, res, next){
  console.log("serving meall page");
  context = {};
  helper.mealPage(req, res, next, ingredientData, mealData);
});

app.get('/search', function(req, res, next){
  console.log("serving search results");
  helper.search(req, res, next, ingredientData, mealData);
});

app.get('/browse', function(req, res, next) {
  console.log("Serving the Browse Page");
  var context = {};
  context.ingredients = ingredientData;
  context.meals = mealData;
  res.status(200);
  res.render("browsePage",context);
});

app.get('/login', function(req, res, next) {
  console.log("Serving the Login Page");
  res.status(200);
  res.render("loginPage", {
    userData: userData
  });
});

app.get('/signup', function(req, res, next) {
  console.log("Serving the Sign Up Page");
  res.status(200);
  //let context = {};
  res.render("signupPage", {
    userData: userData
  });
});

app.post('/newUser', function(req, res, next) {

  console.log("Adding new user...");
  if (req.body && req.body.name && req.body.email && req.body.message) {
    console.log("==Name: ", req.body.name);
    console.log("==Email: ", req.body.email);
    console.log("==Message: ", req.body.message);

    res.status(200).send("Your information was saved.");

    fs.appendFile('userData.json', req.body.username + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(req.body.username);
    });

    fs.appendFile('userData.json', req.body.password + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(req.body.password);
    });

    fs.appendFile('userData.json', req.body.email + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(req.body.email);
    });
  }
  else {
    res.status(400).send("You must fill out all fields.");
  }
});

app.get('/ingredients/:IDs', function(req, res, next) {
  console.log("Ingredients list page");
  var IDs = JSON.parse(req.params.IDs);
  ingredients = [];
  if (IDs.length != 0){
    for(var i = 0; i < IDs.length; i++){
      subs = []
      var temp = false;
      for (var k=0; k < ingredientData.length; k++) {
        if (IDs[i] == ingredientData[k].ID) {
          ing = ingredientData[k];
          console.log(ing)
          s = ing.Subsitutes
          for (var j = 0; j < s.length; j++){
            if(typeof(s[j]) !== "object"){
              ing.Subsitutes[j] = {
                name: ingredientData[s[j]].Name,
                rating: ingredientData[s[j]].Rating
              }
            }
          }
          ingredients.push(ing);
          temp = true;
        }
      }
      if(!temp) {
        res.status(400).send("Bad Ingredient ID");
        break;
      }
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
