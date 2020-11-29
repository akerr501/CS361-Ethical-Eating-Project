// Authors: Maddie Smith

// Require fs to be able to read and write with userData.json
var path = require('path');
var fs = require('fs');

// Get the submit button to add a new user
var submitSignup = document.querySelector('.submit');

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

    addUser(username, password, v_password);

    // Reset the input values to be used for the next time
    resetInputs(n_usernameInput, n_passwordInput, nv_passwordInput);
});

function addUser(username, password, v_password) {
    
    // Only add a user if the username and passwords meet the criteria
    if (verifyUser(username) && verifyPassword(password, v_password)) {

        var request = new XMLHttpRequest();
        var requestURL = "/newUser";
        request.open('POST', requestURL);

        var newUser = {
            Username: username,
            Password: password,
            Access: 1
        };
        var requestBody = JSON.stringify(newUser);

        sendResponseAndRequest(event, request, requestBody);
    }
}

function resetInputs(user, pass, vpass) {
    user.value = "";
    pass.value = "";
    vpass.value = "";
}

function sendResponseAndRequest(event, request, requestBody) {

    if (event.target.status !== 200) {
        var responseToUser = event.target.response;
        //alert("Error storing in database! " + responseToUser);
    } else {
        console.log("Successfully stored in database!");
    }

    request.setRequestHeader(
        'Content-Type', 'application/json'
    );
    request.send(requestBody);
}

// Make sure that the username is unique and not taken
function verifyUser(username) {
    console.log("verifying username");
    let userData = fs.readFileSync('userData.json');
    let jUserData = JSON.parse(userData);

    var i = 0;

    for (i = 0; i < jUserData.length; i++) {
        console.log(jUserData[i].Username);
        if (jUserData[i].Username == username) {
            console.log("DUPLICATE!", username);
            return 0;
        }
    }

    if (username.length >= 8) {
        console.log("Password is at least 8 char\n");
        return 1;
    }
    else {
        console.log("Password must be at least 8 characters\n");
        return 0;
    }
};

// Make sure that the passwords match and are at least 8 characters long
function verifyPassword(password, v_password) {
    console.log("verifying password");
    if (password === v_password) {
        console.log("Passwords match!\n");
        if (password.length >= 8) {
            console.log("Password is at least 8 char\n");
            return 1;
        }
        else {
            console.log("Password must be at least 8 characters\n");
            return 0;
        }
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