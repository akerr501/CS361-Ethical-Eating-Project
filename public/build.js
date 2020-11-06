document.getElementById('button-add').addEventListener('click', function(){
    addIngredient();
})

document.getElementById('verify').addEventListener('click', function(){
  checkIngredients();
})

var ingredients = [
    {
      "ID": 0,
      "Name": "Bluefin Tuna",
      "Rating": 15,
      "Issues": "Critically Endangered Species due to over-fishing.",
      "Subsitutes": [8],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 1,
      "Name": "Nutella",
      "Rating": 48,
      "Issues": "Heavy deforestation to produce palm oil--an ingredient heavily used in making Nutella.",
      "Subsitutes": [9],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 2,
      "Name": "Animal Dairy--Comm.Produced",
      "Rating": 46,
      "Issues": "Animals are subjected to unnatural raising practices and over-exploitation in order to maximize production.",
      "Subsitutes": [10],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 3,
      "Name": "Almonds",
      "Rating": 33,
      "Issues": "Uses 900 gallons of water to produce 1lb.",
      "Subsitutes": [11],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 4,
      "Name": "Wheat Flour",
      "Rating": 50,
      "Issues": "Grown in a monocrop system and harvesting methods heavily contributes to carbon emissins.",
      "Subsitutes": [12],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 5,
      "Name": "Eggs/ Egg Whites",
      "Rating": 36,
      "Issues": "Hens are raised in an inhumane environment.",
      "Subsitutes": [13],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 6,
      "Name": "Sugar",
      "Rating": "23",
      "Issues": "Field burning to harvest sugarcane heavily contributes to greenhouse gases.",
      "Subsitutes": [14],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 7,
      "Name": "Beef/Pork",
      "Rating": 18,
      "Issues": "Animals are subjected to unnatural raising practices and over-exploitation in order to maximize production.",
      "Subsitutes": [15],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 8,
      "Name": "Albacore Tuna",
      "Rating": 51,
      "Issues": "Sustainably farmed Bluefin Tuna alternative.",
      "Subsitutes": [0],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 9,
      "Name": "Nocciolata",
      "Rating": 68,
      "Issues": "Tastes similar to Nutella without the use of palm oil.",
      "Subsitutes": [1],
      "Image": "Not sure if we're having one of theses"
    },
    {
      "ID": 10,
      "Name": "Coconut Milk",
      "Rating": 67,
      "Issues": "Farms are eco-friendly and use small amounts of water to produce coconuts.",
      "Subsitutes": [2],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 11,
      "Name": "Pumpkin Seeds",
      "Rating": 54,
      "Issues": "12 gallons of water is needed to produce 1lb.",
      "Subsitutes": [3],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 12,
      "Name": "Buckwheat Flour",
      "Rating": 53,
      "Issues": "Life cycle restores degraded, sandy soils.",
      "Subsitutes": [4],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 13,
      "Name": "Aquafaba",
      "Rating": 91,
      "Issues": "Made from the viscuous water in which legume seeds have been cooked.",
      "Subsitutes": [5],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 14,
      "Name": "Coconut Palm Sugar",
      "Rating": 66,
      "Issues": "Higher yield per acre compared to sugarcane and harvesting method more sustainable.",
      "Subsitutes": [6],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 15,
      "Name": "Mushrooms",
      "Rating": 85,
      "Issues": "Requires only 1.2 gallons of water to produce 1lb and up to 1million lbs can be produced per acre.",
      "Subsitutes": [7],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 16,
      "Name": "Organic Fruits",
      "Rating": 82,
      "Issues": "High likelihood of being sustainably grown.",
      "Subsitutes": [""],
      "Image": "Not sure if we're having one of theses"
    },
      {
      "ID": 17,
      "Name": "Organic Vegetables",
      "Rating": 71,
      "Issues": "High likelihood of being sustainably grown.",
      "Subsitutes": [""],
      "Image": "Not sure if we're having one of theses"
    }
  ];

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
  
