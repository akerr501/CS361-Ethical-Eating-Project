//var sct = document.currentScript;
//var data = sct.getAttribute('var1');
//console.log(sct);
//console.log(data.Name);
//var my_var = this_js_script.attr('var1');

//populating from paged
var mdata = [];
$(".result.meals").each(function(){
  mdata.push({"id" : $(this).data("mealid"), "ingredients" : Array.from($(this).data("ing").split(','),Number)});
});
var idata = [];
$(".result.ingredients").each(function(){
  idata.push({"id" : $(this).data("ingredientid"), "name": $(this).data("name")});
});
console.log(idata);
console.log("testing");
var temp = 0;
for (i in mdata){
  if (mdata[i].ingredients.includes(temp)){
  console.log("found");
  }
}
var filter = new Map();
$("input[class=filterCheck]").change(function(){
  var curId = $(this).data("ingredientid");
  if($(this).is(':checked')){
    console.log(curId + "was selected");
    filter.set(curId)
  }
  else{
    console.log(curId + "was clocked off");
    filter.delete(curId);
  }
//  console.log(filter);
  filterMeals(filter);
});

function filterMeals(filter){
  console.log("printing filter" + filter.size);
  if (filter.size == 0){
    mdata.forEach(element => {
      $("[data-mealid=" + element.id + "]").show();
    });
  } else {
    mdata.forEach(element => {
      var status = false;
      console.log(element.ingredients);
      filter.forEach(function(value,key){
        console.log(element.ingredients);
        if (element.ingredients.includes(key)){
          status = true;
          console.log("key = " + key + "element = " + element.ingredients);
        }
      });
      if (!status){
        $("[data-mealid=" + element.id + "]").hide();
        console.log(element.id);
      } else {
        $("[data-mealid=" + element.id + "]").show();
      }
      console.log(status);
    });
  }
}
//$("[data-id=" + temp+"]").hide();
//$(".result.meals").data("id")
