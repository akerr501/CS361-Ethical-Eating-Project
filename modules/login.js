// Authors: Maddie Smith

// Require fs to be able to read and write with userData.json
var path = require('path');
var fs = require('fs');

// Get the submit button to add a new user
var submitLogin = document.querySelector('.submit');

// Get the values from each input box
var usernameInput = document.querySelector('#usr');
var passwordInput = document.querySelector('#pwd');

console.log("ENTERED LOGIN.JS\n");

submitLogin.addEventListener('click', function() {

    // Store the values from the input boxes in variables
    var username = usernameInput.value;
    var password = passwordInput.value;

    checkUser(username, password);

    // Reset the input values to be used for the next time
    resetInputs(n_usernameInput, n_passwordInput, nv_passwordInput);
});

function checkUser(username, password) {
    
    // Add access for a user if the username and password meet the criteria
    if (verifyUser(username) && minimumRequirement(password)) {

        var loggedUser = {
            Username: username,
            Password: password,
            Access: 1
        };
        var requestBody = JSON.stringify(loggedUser);

        sendResponseAndRequest(event, request, requestBody);
    }
}

function resetInputs(user, pass, vpass) {
    user.value = "";
    pass.value = "";
    vpass.value = "";
}

function sendResponseAndRequest(event, request, requestBody) {

    /*if (event.target.status !== 200) {
        var responseToUser = event.target.response;
        //alert("Error storing in database! " + responseToUser);
    } else {
        console.log("Successfully stored in database!");
    }*/

    request.setRequestHeader(
        'Content-Type', 'application/json'
    );
    request.send(requestBody);
}

// Make sure that the username is unique and not taken
function verifyUser(username) {
    console.log("verifying username");
    minimumRequirement(username);
    let userData = fs.readFileSync('userData.json');
    let jUserData = JSON.parse(userData);

    var i = 0;

    for (i = 0; i < jUserData.length; i++) {
        console.log("Stored: ",jUserData[i].Username);
        if (jUserData[i].Username == username) {
            console.log("USER EXISTS!", username);
            return 0;
        }
    }
};

// Make sure that the username or password is at least 8 characters long
function minimumRequirement(entry) {
    console.log(entry);
    if (entry.length >= 8) {
        console.log("Is at least 8 char\n");
        return 1;
    }
    else {
        console.log("Must be at least 8 char\n");
        return 0;
    }
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