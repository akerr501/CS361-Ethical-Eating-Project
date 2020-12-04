function checkLog() {
  var user = localStorage.getItem('user');
  console.log(typeof(user));
  if (user != null){
    $(".loginout").html("Logout");
    $(".loginout").attr("href", "");
    $(".loginout").on('click', function(event){
      localStorage.removeItem('user');
      localStorage.removeItem('curRec');
      window.reload();
    });
  }
}

checkLog();
//window.onload(checkLog());

