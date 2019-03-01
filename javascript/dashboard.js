$(document).ready(function () {
  //Validation here
    $("#postForm").validate({
        rules : {
            name : {
              required : true
            },
            species : {
                required : true
              
            },
            family : {
                required : true
                
            },
            class : {
              required : true
            },
            image : {
                required : true
              
            },
            info : {
                required : true
                
            }
        },
        messages: {
            name: "Animal name is required",
            species: "Species is required",
            family: "Animal must belong somewhere",
            class: "Class is required",
            image: "An image link is required",
            info: "Enter some info about this animal"
        },
        submitHandler: function(form) {
          alert("done")
            form.submit();
        }
    });


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
      return string.substring(0, 150) + '.....';
    }
  }

  //declaring variable to be used later
  let $divAppendEdit = $('#divAppendEdit');

  let $name = $('#putName'); //tittle
  let $species = $('#putSpecies');
  let $family = $('#putFamily');
  let $class = $('#putClass');
  let $category = $('#putCategory');
  let $external = $('#putExternal');
  let $image = $('#putImage');
  let $info = $('#putInfo');


  function addAnimalAdmin(animal) {
    $divAppendEdit.append(`<div class="col-md-4">
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
          <button type="button" data-id=${animal.id} id="editButton" data-toggle="modal" data-target="#exampleModal" class="btn btn-sm btn-outline-secondary noedit editButton">Edit   </button>
          <button type="button" data-id=${animal.id} class="btn btn-sm btn-outline-secondary remove">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `);
  }

  //To search for a specific animal with name
  $('#editTab').click(function (e) {
    e.preventDefault();
    let $editSearch = $('#editSearch');
    $editSearch = $editSearch.val();

    $divAppendEdit.empty();

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/animals?q=' + $editSearch,
      success: function (animals) {
        $.each(animals, (i, animal) => {
          addAnimalAdmin(animal);
        })
      },
      error: function () {
        alert('error loading orders');
      }
    });
  });

  //Delete a specific animal 
  $divAppendEdit.delegate('.remove', 'click', function (e) { //.delete has not been added to the page yet hence 
    e.preventDefault();
    let $div = $(this).closest('div');

    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/animals/' + $(this).attr('data-id'),
      success: function () {
        $div.fadeOut(300, function () {
          $(this).remove();
        })
      }
    })
  })

  //Edit animal detail
  $('#saveEdit').on("click", function (e) {
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

    //$('#saveEdit').trigger("reset");
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/animals/' + $("#animalId").val(),
      data: animal,
      success: function () {
      },
      error: function () {
        alert('Error saving order')
      }
    })
  })

  //logOut user
  $('#log-out').click(function (e) {
    e.preventDefault();
    localStorage.removeItem("password");
    localStorage.removeItem("username")
    window.location.replace('http://127.0.0.1:5500/index.html')
  });

})