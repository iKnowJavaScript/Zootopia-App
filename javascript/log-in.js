$(document).ready(() => {


  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/admin',
    success: function (admin) {
      let adminUsername = admin.username;
      let adminPass = admin.password;

      if (adminUsername == localStorage.getItem('username') && adminPass == localStorage.getItem('password')) {
        console.log('Good to go')
        window.location.replace('http://127.0.0.1:5500/html/dashboard.html#addNewAnimals')
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
          window.location.replace('http://127.0.0.1:5500/html/dashboard.html#addNewAnimals')
        } else {
          $(".errorResult").fadeIn();
          $(".errorResult").delay(4000).fadeOut(2000);
        }
      }
    });

  });

})

