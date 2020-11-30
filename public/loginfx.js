//author: Christine Pham

//takes the username value, pw value, and the function used to process the user if logged in successfully
function checkUser(username, pw, urFunc){

    var loginObj = {
        Username: username,
        Password: pw,
        Access: 1
       }

    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status >= 200 && req.status <400){
            var res = req.responseText;
            
            if (res != 'false')
            {
                console.log(res);
                localStorage.setItem('user', res);
                //callback to process result inside async
                urFunc();
            }
        } else {
            console.log("Error in network request: " + req.statusText);}
    }

    req.open("POST", 'http://localhost:3000/checkLogin', true); 
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.send(JSON.stringify(loginObj));
    //event.preventDefault();
}

function getID(){
    let id = JSON.parse(localStorage.getItem('user'));
    id = Number(id.ID);
    return id;
}

function getUserRecipes(){
    let uobj = JSON.parse(localStorage.getItem('user'));
    let arr = uobj.Recipes.map(Number);
    return arr;
}

function getAccess(){
    let uobj = JSON.parse(localStorage.getItem('user'));
    return Number(uobj.Access);
}

function signOut(){
    localStorage.removeItem('user');
}
