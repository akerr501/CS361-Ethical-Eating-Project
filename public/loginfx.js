//author: Christine Pham

function checkUser(username, pw){
    //for POST only
    var loginObj = {
        Username: username,
        Password: pw
       }
    // ^^^^^^^^^^
    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status >= 200 && req.status <400){
            var res = req.responseText;
            
            if (res == 'false') {return false;}
            else {
                localStorage.setItem('user', res);
                return true;
            }
        } else {
            console.log("Error in network request: " + req.statusText);}
    }
    //req.open("GET", "http://localhost:3000/checkLogin ... username + password, true);
    //req.send();

    //req.open("POST", 'http://localhost:3000/checkLogin ...', true);          <---hypothetical route
    //req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    //req.send(JSON.stringify(loginObj));
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