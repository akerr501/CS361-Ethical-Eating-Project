// Authors: Maddie Smith

//var userData = require('./userData')
//var fs = require('fs');
/*var list = document.getElementsByClassName("recipeButton");

list.forEach(el => el.addEventListener('click', event => {
    console.log(event.target.classList[1])
}));*/

var submitSignup = document.querySelector('.submit');
console.log("submit:\n", submitSignup);
var n_usernameInput = document.querySelector('#new-usr');
var n_passwordInput = document.querySelector('#new-pwd');
//var nv_passwordInput = document.querySelector('#new-pwd-verify');
var n_emailInput  = document.querySelector('#new-email');

console.log("ENTERED USER.JS\n");

submitSignup.addEventListener('click', function() {


    console.log('== n_usernameInput:', n_usernameInput.value);
    console.log('== n_passwordInput:', n_passwordInput.value);
    console.log('== nv_passwordInput:', nv_passwordInput.value);
    console.log('== emailInput:', n_emailInput.value);

    var username = n_usernameInput.value;
    var email = n_emailInput.value;
    var password = n_passwordInput.value; 
    //var v_password = nv_passwordInput.value; 
    var request = new XMLHttpRequest();
    var requestURL = "/newUser"; //+ name + "/" + email + "/" + message;
    
    request.open('POST', requestURL);

    var newUser = {
        username: username,
        password: password,
        email: email
    };
    var requestBody = JSON.stringify(newUser);

    request.setRequestHeader(
        'Content-Type', 'application/json'
    );

    request.addEventListener('load', function(event) {
        if (event.target.status !== 200) {
            var responseToUser = event.target.response;
            alert("Error storing in database! " + responseToUser);
        } else {
            console.log("Successfully stored in database!");
        }
    })

    request.send(requestBody);

    n_usernameInput.value = "";
    n_passwordInput.value = "";
    nv_passwordInput.value = "";
    n_emailInput.value = "";
    
    console.log('== n_usernameInput:', n_usernameInput.value);
    console.log('== n_passwordInput:', n_passwordInput.value);
    console.log('== nv_passwordInput:', nv_passwordInput.value);
    console.log('== emailInput:', n_emailInput.value);

});

/**
 * Model for User object, used to create new User
 */
class UserModel {
    constructor(userModel) {
		this.username = userModel.username;
		this.password = userModel.password;
		this.access = userModel.access;
        this.email = userModel.email;
    }
}

//class User {

    verifyPassword(password, v_password) {

        if (password === v_password) {
            console.log("passwords match!\n");
            if (password.length >= 8) {
                console.log("password is at least 8 char\n");
            }
        }
    };

    // Create a new User
    createAccount(userModel) {

        let new_user = new UserModel({
			username: n_usernameInput,
            password: n_passwordInput,
            email: n_emailInput,
			access: 1
		});

        fs.writeFile("userData.json", userModel, function(err) {
            if (err) {
                console.log(err);
            }
        });
    };        
        
    //});
//}


/*
module.exports = {
    User: User,
    UserModel: UserModel
};*/