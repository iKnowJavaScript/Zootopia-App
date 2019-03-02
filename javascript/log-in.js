$(document).ready(() => {


  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/admin',
    success: function (admin) {
      let adminUsername = admin.username;
      let adminPass = admin.password;

      if (adminUsername == localStorage.getItem('username') && adminPass == localStorage.getItem('password')) {
        console.log('Good to go')
        window.location.replace('./dashboard.html')
      }
    }
  });



  $('#submit').click(function (e) {
    e.preventDefault();
    let $inputPassword = $('#inputPassword');
    let $inputEmail = $('#inputEmail');

    $inputPassword = $inputPassword.val();
    $inputEmail = $inputEmail.val();

    localStorage.setItem('username', $inputEmail);
    localStorage.setItem('password', $inputPassword);

    let password = localStorage.getItem('password');
    let username = localStorage.getItem('username')

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/admin',
      success: function (admin) {
        let adminUsername = admin.username;
        let adminPass = admin.password;

        if (adminUsername == username && adminPass == password) {
          console.log('Good to go')
          window.location.replace('./dashboard.html')
        } else {
          $(".errorResult").fadeIn();
          $(".errorResult").delay(4000).fadeOut(2000);
        }
      }
    });

  });

})

