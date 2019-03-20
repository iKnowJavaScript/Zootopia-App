$(document).ready(function () {

  verifyAccess() // send access to dashboard withouth authorisation to login page
  
  //set current time to dashboard
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const newDate = new Date();
  newDate.setDate(newDate.getDate());
  $('#date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

  //limit character lenght
  function limitChar(string) {
    if (string.length > 150) {
      return string.substring(0, 155) + '.....';
    } else {
      return string;
    }
  }

  //declaring variable to be used later
  let $divAppendAdmin = $('#divAppendAdmin');

  let allAnimals = []; //use later to populate edit modal

  //for editButton
  let $editName = $('#putName'); //tittle
  let $editSpecies = $('#putSpecies');
  let $editFamily = $('#putFamily');
  let $editClass = $('#putClass');
  let $editCategory = $('#putCategory');
  let $editExternal = $('#putExternal');
  let $editImage = $('#putImage');
  let $editInfo = $('#putInfo');

  //for  POST request
  let $name = $('#name');
  let $species = $('#species');
  let $family = $('#family');
  let $class = $('#class');
  let $category = $("#category");
  let $external = $('#external');
  let $image = $('#image');
  let $info = $('#info');


  function addAnimalAdmin(animal) {
    $divAppendAdmin.append(`<div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src=${animal.image} alt="${animal.name} image">
      <div class="card-body">
      <p class="card-text data-name">${animal.name}</p>
      <p class="card-text"><strong>Info: </strong> ${limitChar(animal.info)}</p>
      <p class="card-text"><strong>Species: </strong> ${animal.species}</p>
      <p class="card-text"><strong>Class: </strong> ${animal.class}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
          <input type="text" id="animalId" value="${animal.id}" style="display:none;">
          <button type="button" onclick="populateModal(${animal.id})" data-id=${animal.id} id="editButton" data-toggle="modal" data-target="#exampleModal" class="btn btn-sm btn-outline-secondary noedit editButton">Edit   </button>
          <button type="button"  data-id=${animal.id} class="btn btn-sm btn-outline-secondary remove">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `);
  }
  //populate modal for edit

  populateModal = (id) => {
    animal = allAnimals.find((e) => e.id == id);
    $editName.val(`${animal.name}`);
    $editSpecies.val(`${animal.species}`);
    $editFamily.val(`${animal.family}`);
    $editClass.val(`${animal.class}`);
    $editExternal.val(`${animal.external}`);
    $editCategory.find(":selected").text(`${animal.category}`);
    $editImage.val(`${animal.image}`);
    $editInfo.val(`${animal.info}`);
    ID = animal.id;
  }
  let ID = "";
  ID = parseInt(ID); // this is passed inside PUT method

  //Get all animals to admin dashboard
  function getAll() {
    $.ajax({
      type: 'GET',
      url: `${baseUrl}animals`,
      success: function (animals) {
        allAnimals = animals;
        $.each(animals, (i, animal) => {
          addAnimalAdmin(animal);
        })
      },
      error: function () {
        alert('error loading details');
      }
    });
  }
  getAll();

  //To search for a specific animal with name
  $('#editTab').click(function (e) {
    e.preventDefault();
    let $editSearch = $('#editSearch');
    $editSearch2 = $editSearch.val();

    $divAppendAdmin.empty();

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/animals?q=' + $editSearch2,
      success: function (animals) {
        if (animals.length > 0) {
          $.each(animals, (i, animal) => {
            addAnimalAdmin(animal);
            $editSearch.val('')
          })
        } else {
          $divAppendAdmin.append(`<h3>Cannot Get "${$editSearch2}" Match in Databases.</h3>
          <button class="btn btn-primary" onclick="getAll()">Get All</button>`)
        }
      },
      error: function () {
        alert('Error contacting Database')
      }
    });
  });

  //Delete a specific animal 
  $divAppendAdmin.delegate('.remove', 'click', function (e) { //.delete has not been added to the page yet hence 
    e.preventDefault();
    let $div = $(this).closest('div');

    const confirmDelete = confirm("Do you want to Delete this Animal ?")
    if (confirmDelete == true) {
      $.ajax({
        type: 'DELETE',
        url: `${baseUrl}animals/${$(this).attr('data-id')}`,
        success: function () {
          $div.fadeOut(300, function () {
            $(this).closest('.col-md-4').remove();
            //$divAppendAdmin.delegate.remove();
            //$divAppendAdmin.empty();
            //getAll();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Animal deleted from the database',
              showConfirmButton: false,
              timer: 2000
            })
          })
        },
        error: function () {
          alert('Error deleting animal');
        }
      })
    }
  })


  //Edit animal detail
  $('#saveEdit').on("click", function (e) {
    e.preventDefault();
    $('#postForm').validate();

    // const id = $("#animalId").val();
    // let ID = $(this).attr('data-id');

    const animal = {
      name: $editName.val(),
      species: $editSpecies.val(),
      family: $editFamily.val(),
      class: $editClass.val(),
      category: $editCategory.find(":selected").text(),
      external: $editExternal.val(),
      image: $editImage.val(),
      info: $editInfo.val()
    };

    //$('#saveEdit').trigger("reset");
    $.ajax({
      type: 'PUT',
      url: `${baseUrl}animals/${ID}`,
      data: animal,
      success: function () {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Animal Edited Successfully',
          showConfirmButton: false,
          timer: 2000
        })
        getAll();
      },
      error: function () {
        alert('Error saving animal details')
      }
    })
  })

  //POST new animal to Database
  $('#postForm').on('submit', function (e) {
    e.preventDefault();


    const animal = {
      name: $name.val(),
      species: $species.val(),
      family: $family.val(),
      class: $class.val(),
      category: $category.val(),
      external: $external.val(),
      image: $image.val(),
      info: $info.val()
    };

    $('#postForm').trigger("reset");
    $.ajax({
      type: 'POST',
      url: `${baseUrl}animals`,
      data: animal,
      success: function (newAnimal) {
        addAnimalAdmin(newAnimal);
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Animal saved to database',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: function () {
        alert('Error saving animal to database')
      },
    })
  })


  //logOut user
  $('#log-out').click(function (e) {
    e.preventDefault();
    localStorage.removeItem("password");
    localStorage.removeItem("username")
    window.location.replace('../index.html')
  });

  //To verify if user requesting admin data has admin authorisation
  function verifyAccess() {
    let password = localStorage.getItem('password');
    let username = localStorage.getItem('username')
    $.ajax({
      type: 'GET',
      url: `${baseUrl}admin`,
      success: function (admin) {
        let adminUsername = admin.username;
        let adminPass = admin.password;

        if (adminUsername !== username || adminPass !== password) {
          console.log('Access Denied')
          window.location.replace('./log-in.html')
        }
      }
    });
  }
})