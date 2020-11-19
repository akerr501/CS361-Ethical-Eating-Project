const getInfo = (req, res, next, ingredientData, mealData, userData) =>{
    var context = {};
    context.allMeals = [];
    context.allIngredients = [];
    context.savedMealsInfo = [];
    context.curMeal = req.query.ID;
    var curUser = req.query.userID;
    var savedIDs = userData[curUser].Recipes;
    var meal = mealData;
    var ing = ingredientData;


    for(i in ing){
        context.allIngredients.push(ing[i]);
    }

    for(j in meal){
        context.allMeals.push(meal[j]);
    }

    context.curUserInfo = userData[curUser];

    for(k in savedIDs){
        context.savedMealsInfo.push(meal[savedIDs[k]]);
    }

    res.status(200);
    res.render("savedPage", context);
}

exports.getInfo = getInfo;