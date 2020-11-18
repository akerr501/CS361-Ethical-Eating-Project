//Filters data in the contents of the browse page
//-Create array of objects from the meals - tag encoded data
//-Create array of objects from ingredients - tage encoded
//-Set event listener on checkboxes for updating list
//-Update displayed list by changing hidden state

//Meal objects
var mdata = [];
$(".result.meals").each(function(){
  mdata.push({"id" : $(this).data("mealid"), "ingredients" : Array.from($(this).data("ing").split(','),Number)});
});

//Ingredient objects
var idata = [];
$(".result.ingredients").each(function(){
  idata.push({"id" : $(this).data("ingredientid"), "name": $(this).data("name")});
});

//filter keeps track of which checkboxes to display
var filter = new Map();
//set checkbox to the class of checkboxes to track
var checkbox = "input[class=filterCheck]";
//add or remove ingredient id to the filter when clicked
$(checkbox).change(function(){
  var curId = $(this).data("ingredientid");
  if($(this).is(':checked')){
    console.log("ing: " + curId + " selected");
    filter.set(curId)
  }
  else{
    console.log(curId + " disabled");
    filter.delete(curId);
  }
  filterMeals(filter);
});

//update the displayed meals each time an ingredient is selected
function filterMeals(filter){
  //case: no filters selected
  if (filter.size == 0){
    mdata.forEach(element => {
      $("[data-mealid=" + element.id + "]").show();
    });
  } 
  //case: some filters selected
  else {
    mdata.forEach(element => {
      var status = false;
      filter.forEach(function(value,key){
        if (element.ingredients.includes(key)){
          status = true;
        }
      });
      if (!status){
        $("[data-mealid=" + element.id + "]").hide();
      } else {
        $("[data-mealid=" + element.id + "]").show();
      }
    });
  }
}
