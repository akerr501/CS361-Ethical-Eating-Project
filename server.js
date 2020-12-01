// Authors: Adam Kerr, Maddie Smith

var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var mealData = require('./mealData.json');
var ingredientData = require('./ingredientData.json');
var userData = require('./userData.json')
var fs = require('fs');
const { isContext } = require('vm');
var helper = require('./modules/helper.js');

//const User = require('./public/user.js');
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

// build page----------------------------------------------------------------------
//Route to get  all ingredients
app.get('/ingredientData', function(req, res, next) {
  console.log("transmitting ingredient data");
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

app.get('/popuplog', function(req, res, next) {
  console.log("Opened login popup window");
  res.status(200);
  res.sendFile(__dirname + '/public/login\ popup/loginPop.html'); 
});

app.post('/saveRecipe/:userID', function(req, res, next) {
  var userID = req.params.userID;
  let userdata = fs.readFileSync('userData.json');
  let userD = JSON.parse(userdata);

  var recipeId = req.body.ID, name = req.body.Name, rIngred = req.body.Ingredients;

  let mealdata = fs.readFileSync('mealData.json');
  let mealD = JSON.parse(mealdata);

  //check if meal already exists
  if (mealD[recipeId] && mealD[recipeId].ID == recipeId
    && mealD[recipeId].Name == name) {
    //check if the recipe name was changed
    var OGmeal = mealD[recipeId].Ingredients;
    OGmeal = OGmeal.sort().toString();
    rIngred = rIngred.sort().toString();
  }
    //check if any ingredients were changed
    if (OGmeal == rIngred) {
      req.body.Public = true;
      //save meal to userID
      userD[userID].Recipes.push(recipeId);
      //remove double entries of same meal
      let deldoubles = new Set(userD[userID].Recipes);
      userD[userID].Recipes = Array.from(deldoubles);
      let udata = JSON.stringify(userD, null, 1);
      fs.writeFileSync('userData.json', udata);

      res.status(200).send({"result":true});
    } else {
        req.body.ID = mealD.length;
        mealD.push(req.body);
        let data = JSON.stringify(mealD, null, 1);
        fs.writeFileSync('mealData.json', data);

        userD[userID].Recipes.push(req.body.ID);
        let udata = JSON.stringify(userD, null, 1);
        fs.writeFileSync('userData.json', udata);

        res.status(200).send({"result":true});
  }
})
// build page-----------------------------------------------------------------------

app.get('/saved', function(req, res, next) {
  console.log("Serving the Saved Recipes Page");
  //current url syntax: http://localhost:3000/saved/?ID=0&userID=1

  saved.getInfo(req, res, next, ingredientData, mealData, userData);
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
  context.meals = mealData.slice(2);
  res.status(200);
  res.render("browsePage",context);
});
// Login routes ---------------------------------------------------------------
app.get('/login', function(req, res, next) {
  console.log("Serving the Login Page");
  res.status(200);
  res.render("loginPage", {
    userData: userData
  });
});

app.post('/checkLogin', function(req, res, next) {
  let userdata = fs.readFileSync('userData.json');
  let userD = JSON.parse(userdata);
  let found = false;
  for (var i=0; i < userD.length; i++){
    if (userD[i].Username == req.body.Username 
      && userD[i].Password == req.body.Password){
      found = true;
      userD[i].Access = req.body.Access;
      let udata = JSON.stringify(userD, null, 1);
      fs.writeFileSync('userData.json', udata);
      res.status(200).json(userD[i]);
      break;
    } else {continue;}
  }
  if (found == false) {res.status(200).send('false');}
  
});
// Login routes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
app.get('/signup', function(req, res, next) {
  console.log("Serving the Sign Up Page");
  res.status(200);
  //let context = {};
  res.render("signupPage", {
    userData: userData
  });
});

app.post('/newUser', function(req, res, next) {

  let userData = fs.readFileSync('userData.json');
  let jUserData = JSON.parse(userData);

  var user = {
    ID: jUserData.length,
    Username: req.body.Username,
    Password: req.body.Password,
    Recipes: [],
  };
  
  if (req.body.Username && req.body.Password) {
    jUserData.push(user);
    let data = JSON.stringify(jUserData, null, 1);

    fs.writeFileSync('userData.json', data);
    res.status(200).send("Your information was saved.");
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
        swap: true
      });
    }
  }
  else res.status(400).send("No IDs found in the array")
});

app.get('/ingredient/:ID', function(req, res, next) {
  var id = req.params.ID;
  var ingredients = [];
  for (var k=0; k < ingredientData.length; k++) {
    if (id == ingredientData[k].ID) {
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
      ingredients = [ing];
    }
  }

  if(ingredients.length > 0){
    res.status(200);
    res.render('ingredientsPage', {
      INGREDIENTS: ingredients,
      swap: false
    });
  }
  else res.render('404Page', {});
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
