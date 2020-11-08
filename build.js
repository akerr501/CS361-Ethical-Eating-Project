var ingredients; 
//load up ingredient data from server
window.onload = function() {
  req = new XMLHttpRequest();
  req.onload = function() {
    if (req.status === 200) {
      ingredients = JSON.parse(this.responseText);

        console.log(ingredients);
        
      } else {
        console.log("Error in network request: " + req.statusText);}
    }
  req.open("GET", "http://localhost:3000/ingredientData", true);
  req.send();
}

document.getElementById('button-add').addEventListener('click', function(){
    addIngredient();
})

document.getElementById('verify').addEventListener('click', function(){
  checkIngredients();
})

  function checkIngredients() {
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
    //pass toswap to a method
    console.log(toswap);
  }
  
  function addIngredient() {
    var options = '';
    options += `<br><input list="product"  class="ingredient-input" placeholder="Select Ingredient"/>
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
  
