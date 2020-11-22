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

//req is going to be the user id maybe idk
app.get('/saved', function(req, res, next) {
  console.log("Serving the Saved Recipes Page");

  var context = {};

  //this is wrong, bc uhhhh i think it is
  //var userIdNum = req.params.id;
  var userIdNum = "1";
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
          s = ing.Subsitutes
          for (var j = 0; j < s.length; j++){
            if(typeof(s[j]) !== "object"){
              ing.Subsitutes[j] = {
                name: ingredientData[s[j]].Name,
                rating: ingredientData[s[j]].Rating,
                ID: s[j],
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
