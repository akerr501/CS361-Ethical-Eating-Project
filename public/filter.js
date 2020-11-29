//Author: Eric Sanchez
//Filters data in the contents of the browse page
//-Create array of objects from the meals - tag encoded data
//-Create array of objects from ingredients - tage encoded
//-Set event listener on checkboxes for updating list
//-Update displayed list by changing hidden state

//Meal objects
var mdata = [];
$(".result.meals").each(function(){
  mdata.push({"id" : $(this).data("mealid"), "ingredients" : Array.from($(this).data("ing").split(','),Number), "rating":$(this).data("mealrating")});
});

//Ingredient objects
var idata = [];
$(".result.ingredients").each(function(){
  idata.push({"id" : $(this).data("ingredientid"), "rating":$(this).data("ingrating"), "name": $(this).data("name")});
});

//set cboxIn to the class of checkboxes to include
var cboxIn = "input[class=filterIn]";
var cboxOut = "input[class=filterOut]";
var minInput = "input[class=rMin]";
var maxInput = "input[class=rMax]";

$(document).on('click', '.dropdown-menu', function(event){
  event.stopPropagation();
});
//adjust for meal rating range
$(minInput).change(function(){
  mealFilter.setRmin($(minInput).val());
});

$(maxInput).change(function(){
  mealFilter.setRmax($(maxInput).val());
});

//add or remove ingredient id to the filter when clicked
$(cboxIn).change(function(){
  var curId = $(this).data("ingredientid");
  mealFilter.setIn(this, curId);
});

$(cboxOut).change(function(){
  var curId = $(this).data("ingredientid");
  mealFilter.setOut(this, curId);
});

//Filter class, keeps track of selections and provides functions
//for setting and applying filter
class mfilter{
  constructor(cboxI, cboxO, min, max){
    this.in = new Map();
    this.out = new Map();
    this.rMax = max;
    this.rMin = min;
    this.cboxO = cboxO;
    this.cboxI = cboxI;
    this.apply();
  }
  setIn(option, curId){
    if ($(option).is(':checked')){
      console.log("ing: " + curId + " selected");
      $(this.cboxO + '[data-ingredientid=' + curId +']').prop('checked',false);
      this.in.set(curId);
      if (this.out.has(curId)){
        this.out.delete(curId);
      }
    } else {
      this.in.delete(curId);
    }
    this.apply();
  }
  setOut(option, curId){
    if ($(option).is(':checked')){
      console.log("out id: " + curId);
      $(this.cboxI + '[data-ingredientid=' + curId + ']').prop('checked',false);
      this.out.set(curId);
      if (this.in.has(curId)){
        this.in.delete(curId);
      }
    } else {
      this.out.delete(curId);
    }
    this.apply();
  }
  setRmax(max){
    this.rMax = max;
    this.apply();
  }
  setRmin(min){
    this.rMin = min;
    this.apply();
  }
  apply(){
    //apply filtered in first
    if (this.in.size == 0){
      mdata.forEach(element => {
        $("[data-mealid=" + element.id +"]").show();
      });
    } else {
      mdata.forEach(element => {
      var status = false;
      this.in.forEach(function(value,key){
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
    //remove filtered out meals
    if (this.out.size != 0){
      mdata.forEach(element =>{
        this.out.forEach(function(value,key){
          if (element.ingredients.includes(key)){
            $("[data-mealid=" + element.id + "]").hide();
          }
        });
      });   
    }
    //remove meals exceeding the rating range
    mdata.forEach(element =>{
      if (element.rating < this.rMin || element.rating > this.rMax){
        console.log("rating = "+ element.rating);
        $("[data-mealid=" + element.id + "]").hide();
      }
    });
    //remove ingredients exceeding the rating range
    idata.forEach(element =>{
      if (element.rating < this.rMin || element.rating > this.rMax){
        console.log("rating = " + element.rating);
        $("[data-ingredientid=" + element.id + "]").hide();
      } else {
        $("[data-ingredientid=" + element.id + "]").show();

      }
    });
    console.log("filter updated");
  }
}


//filter keeps track of which ingredients are displayed
let mealFilter = new mfilter(cboxIn, cboxOut, $(minInput).val(), $(maxInput).val());
