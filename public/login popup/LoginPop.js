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
window.onunload = refreshParent;

document.getElementById('login').addEventListener('click', function(){
  createLoginObj();
});

document.getElementById('signup').addEventListener('click', function(){
  //send to signup page
  url = "http://localhost:3000/signup";
  window.location.href = url;
})

function refreshParent(){
  window.opener.location.reload();
}

function createLoginObj() {

  let user = document.getElementById('username').value;
  let pw = document.getElementById('password').value;

  checkUser(user, pw, verifyUser);
}

function verifyUser(){

  if (localStorage.getItem('user')){
    //changed text to 'welcome back!' and close button 
    document.getElementById('msg1').style.display = "none";
    document.getElementById('msg3').style.display = "inline-block";
    document.getElementById('login').style.display = "none";
    document.getElementById('signup').style.display = "none";
    document.getElementById('close').style.display = "inline";
  } else {
    //change text to 'something doesnt match'
    document.getElementById('msg1').style.display = "none";
    document.getElementById('msg2').style.display = "inline-block";
  }
}
