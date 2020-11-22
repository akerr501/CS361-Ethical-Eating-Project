var IDs =[];
var buttons = document.getElementsByClassName("subsitutes-button");
var subsitutes = document.getElementsByClassName('subsitutes-container');
assign_listeners();



function assign_listeners(){
  // assign listeners to expand collapsed subsitutions, user wants to see what they can swap with
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") { // swap visibility state of container
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  // assign listeners for each of the subsitutions, swapping the colors of elements
  for (i = 0; i < subsitutes.length; i++){
    var sub_children = subsitutes[i].children;
    for(var j = 1; j <sub_children.length; j++){
      let sub = sub_children[j];
      sub.addEventListener('click', function(){
        subs(sub); // actual color swapping occurs here
      });
    }
  }

  assignPageButtonListeners();
}

function subs(sub){
  let container = sub.parentElement.children;
  let clear = false; // used if the user wants to deselect swap
  for(var i = 1; i < container.length; i++){
    tempSub = container[i];
    if(tempSub.style.backgroundColor == "darkseagreen"){
      container[i].style.backgroundColor = "";
      if(tempSub == sub) clear = true;
    }
  }
  if(!clear) sub.style.backgroundColor = "darkseagreen";
}

function assignPageButtonListeners(){
  var swap = document.querySelector('.swap-button');
  var back = document.querySelector('.back-button');

  // assign listener for the swap button
  swap.addEventListener('click', function(){
    for (i = 0; i < subsitutes.length; i++){
      sub_children = subsitutes[i].children;
      IDs[i] = sub_children[0].innerHTML;
      for(var j = 1; j <sub_children.length; j++){
        if(sub_children[j].style.backgroundColor == "darkseagreen") IDs[i] = sub_children[j].children[0].innerHTML;
      }
    }
    console.log(IDs); // actually go back to build recipe page from here
  });
  // assign listener for the back button
  back.addEventListener('click', function(){
    console.log("back clicked");
  });
}
