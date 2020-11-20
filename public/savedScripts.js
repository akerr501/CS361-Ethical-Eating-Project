//https://stackoverflow.com/questions/10291017/how-to-get-id-of-button-user-just-clicked
var buttons = document.getElementsByClassName("recipeButton");
var buttonsCount = buttons.length;

//this might need to change if no recipes
var recipeName = buttons[0].innerHTML;
for(var i = 0; i < buttonsCount; i++){
    buttons[i].onclick = function(e){
        console.log("clicked");
        var chosenButton = buttons[i];
        changeInfo(chosenButton);
    }
}

function changeInfo(chosenButton) {
    var newID = chosenButton.id;
    console.log(newID);
}

//keeping stuff that i deleted on GH
// var list = document.getElementsByClassName("recipeButton");

// list.forEach(el => el.addEventListener('click', event => {
//     console.log(event.target.classList[1])
// }));