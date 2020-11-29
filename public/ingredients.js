var IDs =[];
var buttons = document.getElementsByClassName("subsitutes-button");
var subsitutes = document.getElementsByClassName('subsitutes-container');
assign_listeners();



function assign_listeners(){
  assignCollapseListeners();
  assignSubsitutionListeners();
  assignPageButtonListeners();
}

function assignCollapseListeners(){
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "flex") { // swap visibility state of container
        content.style.display = "none";
      } else {
        content.style.display = "flex";
      }
    });
  }
}

function assignSubsitutionListeners(){
  for (i = 0; i < subsitutes.length; i++){
    var sub_children = subsitutes[i].children;
    for(var j = 1; j <sub_children.length; j++){
      let sub = sub_children[j];
      sub.addEventListener('click', function(){
        subsitutionSwapListener(sub);
      });
    }
  }
}


function subsitutionSwapListener(sub){
  let container = sub.parentElement.children;
  let clear = false; // used if the user wants to deselect swap
  for(var i = 1; i < container.length; i++){
    tempSub = container[i];
    console.log(tempSub.style.backgroundColor);
    if(tempSub.style.backgroundColor == "rgb(183, 206, 168)"){
      container[i].style.backgroundColor = "";
      if(tempSub == sub) clear = true;
    }
  }
  if(!clear) sub.style.backgroundColor = "rgb(183, 206, 168)";
}

function assignPageButtonListeners(){
  var swap = document.querySelector('.swap-button');
  //var back = document.querySelector('.back-button');
  // assign listener for the swap button
  swap.addEventListener('click', swapListener);
  // assign listener for the back button
  //back.addEventListener('click', function(){
  //  console.log("back clicked");
  //});
}

function swapListener(){
  for (i = 0; i < subsitutes.length; i++){
    sub_children = subsitutes[i].children;
    IDs[i] = sub_children[0].innerHTML;
    for(var j = 1; j <sub_children.length; j++){
      if(sub_children[j].style.backgroundColor == "rgb(183, 206, 168)") IDs[i] = sub_children[j].children[0].innerHTML;
    }
  }
  console.log(IDs); // actually go back to build recipe page from here
}
