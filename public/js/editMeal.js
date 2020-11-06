//create object and submit get request to create meal
function editMeal(){
  var mealName = $('h1[name="mealName"]').get(0).innerHTML;
  var ingredientsTable = $('td[name="ingName"]').get();
  var meal = {};
  meal.name = mealName; 
  meal.ingredients = [];
  for (i in ingredientsTable){
    meal.ingredients.push(ingredientsTable[i].innerHTML);
  }
  console.log(meal);
  var payload = JSON.stringify(meal);
  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/build", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange=function(){
    window.location.assign(req.response);
  }
  req.send(payload);

};

window.onload = function(){
  document.getElementById("editMeal").addEventListener("click", editMeal);
  
}
