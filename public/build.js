//Author: Christine Pham

var ingredients, loginPopup;
//load up ingredient data from server
window.onload = function() {

  req = new XMLHttpRequest();
  req.onload = function() {
    if (req.status === 200) {
      ingredients = JSON.parse(this.responseText);

      ingredients=ingredients["ingredientData"];
        //check if any swap items stores in localStorage to populate
      if (localStorage.getItem('swap')){
        var arr = JSON.parse(localStorage.getItem('swap')).map(Number);
        swap(arr);
        localStorage.removeItem('swap');
      }

      } else {
        console.log("Error in network request: " + req.statusText);}
    }
  req.open("GET", "http://localhost:3000/ingredientData", true);
  req.send();
}

var add = document.getElementById('button-add');
if (add){
  add.addEventListener('click', function(){
    addIngredient();
})}

var checkRecipe = document.getElementById('verify');
if (checkRecipe){
  checkRecipe.addEventListener('click', function(){
    checkIngredients();
})}

var resetButton = document.getElementById('reset');
if (resetButton){
  resetButton.addEventListener('click', function(){
    formReset();
})}

var saveButton = document.getElementById('verify-login');
if (saveButton){
  saveButton.addEventListener('click', function() {
    let result = checkLogin(); //done
    if (result == false) {promptLogin();} //done
    else {pkgRecipe();} //done
})}

function deleteIngredient(item) {
  if (item.previousSibling == '<br>') {
    item.parentNode.previousSibling.remove();
  }
  item.parentNode.remove();
}


  function checkIngredients(asMealObj = false) {
    var toswap = [];
    var selected = document.getElementsByClassName('ingredient-input');
    for (var k=0; k<selected.length; k++) {
      let item = selected[k].value;
      item = item.slice(0, -3);
      item = item.trim();

      var i = 0;
      while (i < ingredients.length) {

        if (item == ingredients[i].Name) {
          toswap.push(ingredients[i].ID)
          break;
        }
        i++
      }
    }
    //use method to grab meal data instead
    if (asMealObj == true) {
      return toswap;
    } 

    url = "http://localhost:3000/ingredients/[" + toswap.toString() + "]";
    window.location.href = url;
    
  }
  

  function destroyIngredients() {
    var table = document.getElementById('ingredient-box');
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }


  function formReset() {
    location.reload();
    return false;
  }

 
  function populateList(inArr) {

    var table = document.getElementById('ingredient-box');
    var options = '';

    for (var i=0; i < inArr.length; i++) {

      options += `<br><input type="button" class="delete" value="X" onClick="deleteIngredient(this)" style="display:inline;"/>
    <input list="product"  class="ingredient-input" placeholder="Select Ingredient" 
    value="${ingredients[inArr[i]].Name}    ${ingredients[inArr[i]].Rating}" autocomplete="on"/>
        <datalist id="product">`;
      for(var j=0; j<ingredients.length; j++){
        //iterate thru json ingredient list
        options += `<option value="${ingredients[j].Name}    ${ingredients[j].Rating}" name="${ingredients[j].Name}">`;
        };
      options += `</datalist>`;  
      var node = document.createElement('span');
      node.innerHTML = options;
      table.appendChild(node);
      options = '';
    }
  }


  function swap(ingredientArr) {
    destroyIngredients();
    populateList(ingredientArr);
  }


  function addIngredient() {
    //displays the delete button for first item once an additional ingredient is added
    var first = document.getElementById("delete0");
    if (first) {
    first.style.display = "inline";}

    var options = '';
    options += `<br><input type="button" class="delete" value="X" onClick="deleteIngredient(this)" style="display:inline;"/>
    <input list="product"  class="ingredient-input" placeholder="Select Ingredient" autocomplete="on"/>
        <datalist id="product">`;

    for(var i=0; i<ingredients.length; i++){
      //iterate thru json ingredient list
      options += `<option value="${ingredients[i].Name}    ${ingredients[i].Rating}" name="${ingredients[i].Name}">`;
      };
      options += `</datalist>`;
    var node = document.createElement('span');
    node.innerHTML = options;
    document.getElementById("ingredient-box").appendChild(node);

  }
  // creates a rating for the new recipe based on average score of ingredients
  function getRating(arr){
    total = 0;
    for (var i=0; i< arr.length; i++){
      total += Number(ingredients[arr[i]].Rating);
    }
    return Math.round(total/arr.length);
  }

  //package a new recipe object--value verification will be on server
  function pkgRecipe() {
    let id = document.getElementById('recipe-id').value
    if (id != '') {
      id = Number(id);
    }else {id = -1}

    let ingred = checkIngredients(true);

    var newRecipe = {
      ID: id,
      Name: document.getElementById('recipeTitle').value,
      Ingredients: ingred.map(Number),
      Rating: getRating(ingred),
      Public: document.getElementById('customSwitch1').checked,
      Image: ''
    }
    shipRecipe(newRecipe);
  }

  function checkLogin() {
    let logged = false;
    if (localStorage.getItem('user')){
      logged = true;
    }
    return logged;
  } 

  function shipRecipe(recipeObj) {
    //need a user ID that will be a number
    var userID = getID();
    var req = new XMLHttpRequest();

    req.onload = function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(response);
        if (response.result == true) {
          document.getElementById('verify-login').style.display = "none";
          document.getElementById('saved').style.display = "inline";
          localStorage.setItem('user', JSON.stringify(response.data));
        }
  
      } else {
          console.log("Error in network request: " + req.statusText);
      }
  };
  
      req.open("POST", 'http://localhost:3000/saveRecipe/'+ userID, true);
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      console.log(recipeObj);
      req.send(JSON.stringify(recipeObj));
      event.preventDefault();
  }

  function promptLogin(){
    loginPopup = window.open("http://localhost:3000/popuplog", 
    "_blank", "width=350, height=300");
  }
