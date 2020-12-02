const getInfo = (req, res, next, ingredientData, mealData, userData) =>{
    var curUser = req.query.userID;
    var context = {};
    context.allMeals = [];
    context.allIngredients = [];
    context.savedMealsInfo = [];
    context.curIngredients = [];
    context.curMeal = req.query.ID;
    var savedIDs = userData[curUser].Recipes;
    var meal = mealData;
    var ing = ingredientData;

    context.curUserInfo = userData[curUser];

    //guest user
    if(curUser == 0){
        context.curMeal = null;
        //add error meal to context
        context.savedMealsInfo.push(meal[0]);
        context.curMealInfo = meal[0];
    }

    //logged in user has no saved recipes
    else if(context.curUserInfo.Recipes.length == 0){
        context.curMeal = null;
        //add error meal to context
        context.savedMealsInfo.push(meal[1]);
        context.curMealInfo = meal[1];
    }

    //user is logged in AND has saved recipes
    else{
        for(i in ing){
            context.allIngredients.push(ing[i]);
        }

        for(j in meal){
            context.allMeals.push(meal[j]);
        }

        for(k in savedIDs){
            context.savedMealsInfo.push(meal[savedIDs[k]]);
        }

        context.curMealInfo = meal[context.curMeal];

        //so logged in users wont see the error messages
        if(context.curMeal == 0 || context.curMeal == 1){
            context.curMealInfo = meal[context.curUserInfo.Recipes[0]];
        }
    
        for(l in context.curMealInfo.Ingredients){
            context.curIngredients.push(ingredientData[context.curMealInfo.Ingredients[l]]);
        }

    }

    res.status(200);
    res.render("savedPage", context);
}

exports.getInfo = getInfo;