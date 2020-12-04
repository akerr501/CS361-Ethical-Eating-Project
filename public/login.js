// Authors: Maddie Smith

// Get the submit button to add a new user
var submitLogin = document.querySelector('.submit');

// Get the values from each input box
var usernameInput = document.querySelector('#usr');
var passwordInput = document.querySelector('#pwd');

console.log("ENTERED LOGIN.JS\n");

submitLogin.addEventListener('click', function(event) {
    event.preventDefault();
    // Store the values from the input boxes in variables
    var username = usernameInput.value;
    var password = passwordInput.value;

    checkUser(username, password);
});

function checkUser(username, password) {
        var loggedUser = {
            Username: username,
            Password: password,
            Access: 1
        };
        var requestBody = JSON.stringify(loggedUser);
        sendResponseAndRequest(event, requestBody);
}

function resetInputs(user, pass, vpass) {
    user.value = "";
    pass.value = "";
    vpass.value = "";
}

function sendResponseAndRequest(event, requestBody) {
   var requestURL = "/checkLogin"
    var req = new XMLHttpRequest();
    req.open("POST", requestURL, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener("load", function(){
    if (req.status >= 200 && req.status < 400){
        var res = JSON.parse(req.responseText);
        if (res == false){
          alert("Invalid username or password, please re-enter");
          console.log(res);
        } else {
          localStorage.setItem('user', req.responseText);
          localStorage.removeItem('curRec');
          window.location.href = "/";
        }
    } else{
        alert(req.responseText);
      }
    }
);
   req.send(requestBody);
}

/**
 * Model for User object, used to create new User
 */
class UserModel {
    constructor(userModel) {
		this.username = userModel.username;
		this.password = userModel.password;
		this.access = userModel.access;
    }
};
