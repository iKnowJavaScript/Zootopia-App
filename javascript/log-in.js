$(document).ready(() => {

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
          success: function (admin) { //animals == booklists && book == animal
            if(admin.password == password && admin.username == username) {
                console.log('Good to go')
                window.location.replace('http://127.0.0.1:5500/html/dashboard.html#addNewAnimals')
            }else{
                console.log('check matching')
            }
          },
          error: function () {
            alert('error loading orders');
          }
        });
      });
    
})