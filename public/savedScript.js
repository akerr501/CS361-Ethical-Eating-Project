//author: Christine Pham 

//takes the username value, pw value, and the function used to process the user if logged in successfully
function checkUser(username, pw, urFunc){

    var loginObj = {
        Username: username,
        Password: pw,
       }

    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status >= 200 && req.status <400){
            var res = req.responseText;
            
            if (res != 'false')
            {
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

function signOut(){
    localStorage.removeItem('user');
}

function gettingLocalStorage(){
    var userInfo;

    if(localStorage.getItem("user")){
        //userInfo = localStorage.getItem('user');
        //userInfo = JSON.parse(userInfo);
        var userID = getID();

        //userInfo.userID = userID;
        //userInfo = JSON.stringify(userInfo);
        if(localStorage.getItem("curRec")){
            curRec = localStorage.getItem("curRec");
            userID = {
                "userID": userID,
                "curRec": curRec
            }            
        }
        else{
            userID = {
                "userID": userID
            }
        }

        var myReq = new XMLHttpRequest();
        myReq.open("POST", 'http://localhost:3000/saved', true); 
        myReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        myReq.onload = function() {
            if(myReq.status >= 200 && myReq.status <400){
            }
            else{
            }
        }
       myReq.send(JSON.stringify(userID));
    }

    else{
        console.log("not logged in");
    }
}

window.onload = gettingLocalStorage();

var list = document.getElementsByClassName("recipeButton");
for(let b = 0; b < list.length; b++){
    list[b].addEventListener('click', function(){
        //console.log("button clicked" + b);
        curButton = list[b];

        //click current recipe
        var recID = curButton.getAttribute('value');
        localStorage.setItem('curRec', recID);
        reload();
        reload();
    }
    )
}

function reload()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
}

reload();