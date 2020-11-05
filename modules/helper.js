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

//mealPage function makes an object for response, gets pertinent
//meal data and queries the ingredientData.json to get ingredient info
//for table in page
const mealPage = (req, res, next, ingredientData, mealData) => {
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

//exported function names, could these be named better?
exports.search = search;
exports.mealPage = mealPage;
