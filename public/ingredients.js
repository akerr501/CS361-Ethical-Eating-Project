var buttons = document.getElementsByClassName("subsitutes-button");
var i;

for (i = 0; i < buttons.length; i++) {
  console.log(i)
  buttons[i].addEventListener("click", function() {
    console.log("clicked")
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
