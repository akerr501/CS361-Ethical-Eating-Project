function field_focus(field, username)
  {if(field.value == username)
    { field.value = ''; }
  }

  function field_blur(field, username)
  {if(field.value == '')
    {field.value = username;}
  }

//Fade in dashboard box
$(document).ready(function(){
    $('.box').hide().fadeIn(1000);
    });

//Stop click event
$('a').click(function(event){
    event.preventDefault();
	});
// functions belonging to design ^^^^^^^^^^^^^^^^^^^^^^^^^^

document.getElementById('login').addEventListener('click', function(){
  createLoginObj();
});

function createLoginObj() {
 var loginObj = {
   user: document.getElementById('username').value,
    pw: document.getElementById('password').value
  }
 checkinUser(loginObj);
}

function checkinUser(obj){
  //get req for user object if result is true (user found) -- change prompt to welcome back!
  //think there is already a function for this in build.js
  //if result is false ---> prompt login again --
  //
}

function close(){
  // myWindow = window.open("", "myWindow", "width=200,height=100");
  //myWindow.close();
}
