// Authors: Maddie Smith, Chistine Pham

// Require fs to be able to read and write with userData.json
//var path = require('path');
//var fs = require('fs');

// Get the submit button to add a new user
var submitSignup = document.querySelector('.signupbtn');

// Get the values from each input box
var n_usernameInput = document.querySelector('#new-usr');
var n_passwordInput = document.querySelector('#new-pwd');
var nv_passwordInput = document.querySelector('#new-pwd-verify');

console.log("ENTERED USER.JS\n");

submitSignup.addEventListener('click', function() {

    // Store the values from the input boxes in variables
    var username = n_usernameInput.value;
    var password = n_passwordInput.value;
    var v_password = nv_passwordInput.value;

    // Only add a user if the username and passwords meet the criteria
    let result = verifyPassword(password, v_password);
    if (result == 1){addUser(username, password, v_password);}

    // Reset the input values to be used for the next time
    resetInputs(n_usernameInput, n_passwordInput, nv_passwordInput);
});

function resetInputs(user, pass, vpass) {
    user.value = "";
    pass.value = "";
    vpass.value = "";
}

function addUser(username, password) {
    
    var requestURL = "http://localhost:3000/newUser";
        
    var newUser = {
        Username: username,
        Password: password
    };
    var requestBody = JSON.stringify(newUser);

    var request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status >= 200 && request.status <400){
            console.log("Successfully stored in database!");
                
                
        } else {
            var responseToUser = request.responseText;
            alert("Error storing in database! " + responseToUser);}
        }
    
    request.open("POST", requestURL, true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(requestBody);
}

// Make sure that the passwords match and are at least 8 characters long
function verifyPassword(password, v_password) {
    console.log("verifying password");
    if (password == v_password) {
        console.log("Passwords match!\n");
        if (password.length >= 8) {
            console.log("Password is at least 8 char\n");
            return 1;
        }
        else {
            console.log("Password must be at least 8 characters\n");
            return 0;
        }
    } else {
        console.log("Passwords must match\n");
        return 0;
    }
};

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

//module.exports = UserModel;