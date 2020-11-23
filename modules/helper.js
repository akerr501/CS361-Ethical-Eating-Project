//functions for populating JSON respons objects for handlebars to render
//search makes an object from ingredients and meals containing the
//search term.
const search = (req, res, next, ingredientData, mealData) => {
  var context = {};
  context.meals = [];
  context.ingredients = [];
  context.search = req.query.q;
  var search = context.search.toLowerCase();
  var meal = mealData;
  var ing = ingredientData;
  var ingArr = [];
  var mealArr = [];
  //handles empty search input
  if (context.search == ""){
    console.log("nothing");
  } else {
    //find ingredients which match search term
    for (i in ing){
      if (ing[i].Name.toLowerCase().includes(search)){
        context.ingredients.push(ing[i]);
        ingArr.push(ing[i]);
      }
    }
    //find meals containing ingredients matching the search term
    for (i in ingArr){
      id = ingArr[i].ID;
      for (j in meal){
        if(meal[j].Ingredients.includes(id)){
          mealArr.push(meal[j]);
          console.log("*** ID: " +id);
        }
      }
    }
    //find meals which match the search term, but there were not matching
    //ingredients
    for (j in meal){
      if (meal[j].Name.toLowerCase().includes(search)){
        if (!mealArr.includes(meal[j])){
        mealArr.push(meal[j]);
        }
      }
    }
  }
  context.meals = mealArr;
  console.log(context);
  res.status(200);
  res.render("searchPage", context);

} 

//meal function makes an object for response, gets pertinent
//meal data and queries the ingredientData.json to get ingredient info
//for table in page
const mealPage = (req, res, next, ingredientData, mealData) => {
  var context = {};
  context.meal = {};
  context.ingredient = {};
  var ID = req.query.ID;
  context.meal.Name = mealData[ID].Name;
  context.meal.id = ID;
  console.log("ID: " + context.meal.id);
  context.meal.er = mealData[ID].Rating;
  var ingredients = [];
  ingredients = mealData[ID].Ingredients;
  for (i in ingredients){
    context.ingredient[i] = {"ID" : ingredientData[ingredients[i]].ID, "Name" : ingredientData[ingredients[i]].Name,
      "Rating" : ingredientData[ingredients[i]].Rating};
  }
  console.log(context.meal);
  console.log(context.ingredient);
  res.status(200);
  res.render("mealPage", context);
}

//editMeal function gets a meal ID from the client to populate the build
//meal page. It then renders the build page using the object created from
//the request
const editMeal = (req, res, next, ingredientData, mealData) => {
  var ID = req.query.ID;
  //check if arriving at build page through link or other meal
  if (ID == null){
    //change this out with empty view or revise view to handle null input
    res.render("loginPage", {});
  } else {
  var context = {};
  context.meal = {};
  context.ingredient = {};
  context.meal.Name = mealData[ID].Name;
  context.meal.id = ID;
  console.log("ID: " + context.meal.id);
  context.meal.er = mealData[ID].Rating;
  var ingredients = [];
  ingredients = mealData[ID].Ingredients;
  for (i in ingredients){
    context.ingredient[i] = {"Name" : ingredientData[ingredients[i]].Name,
      "Rating" : ingredientData[ingredients[i]].Rating};
  }
  console.log(context.meal);
  console.log(context.ingredient);
  res.status(200);
  res.render("buildPage", context);
  }
}

//exported function names
exports.search = search;
exports.mealPage = mealPage;
exports.editMeal = editMeal;
