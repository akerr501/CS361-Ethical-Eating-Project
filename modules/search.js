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
  //console.log(context);
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
  //console.log(context.meal);
  //console.log(context.ingredient);
  res.render("mealPage", context);
}

exports.search = search
exports.mealPage = mealPage;
