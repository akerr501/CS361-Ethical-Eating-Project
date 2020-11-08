var list = document.getElementsByClassName("recipeButton");

list.forEach(el => el.addEventListener('click', event => {
    console.log(event.target.classList[1])
}));