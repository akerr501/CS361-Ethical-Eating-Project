const getInfo = (req, res, next, ingredientData, mealData, userData, userInformation) =>{ 
    var meal = mealData;
    var ing = ingredientData;
    var users = userData;   
    
    if(userInformation){
        var curUser = userInformation.userID;
        var context = {};
        context.allMeals = [];
        context.allIngredients = [];
        context.savedMealsInfo = [];
        context.curIngredients = [];
        context.allUsers = [];
        
        context.curUserInfo = userData[curUser];
        var savedIDs = userData[curUser].Recipes;

        //user is logged in AND has saved recipes

            for(i in ing){
                context.allIngredients.push(ing[i]);
            }

            for(j in meal){
                context.allMeals.push(meal[j]);
            }

            for(a in users){
                context.allUsers.push(users[a]);
            }

            for(k in savedIDs){
                context.savedMealsInfo.push(meal[savedIDs[k]]);
            }

            context.curMealInfo = meal[context.curMeal];

            //so logged in users wont see the error messages
            if(context.curMeal == 0 || context.curMeal == 1){
                context.curMealInfo = meal[context.curUserInfo.Recipes[0]];
            }
        
        if(userInformation.curRec){
            console.log("in curRec");
            var curRec = userInformation.curRec;
            context.curMeal = curRec;
            context.curMealInfo = meal[curRec];


            for(l in context.curMealInfo.Ingredients){
                context.curIngredients.push(ingredientData[context.curMealInfo.Ingredients[l]]);
            }
        }

        res.status(200);
        res.render("savedPage", context);}

    else{
        var context = {};
        context.savedMealsInfo = [];
        context.curMeal = 9;
        context.savedMealsInfo.push(meal[9]);
        context.curMealInfo = meal[9];
        res.render("savedPage", context);
    }
}

exports.getInfo = getInfo;