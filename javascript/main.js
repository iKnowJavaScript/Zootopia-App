/*
$(function() {
  $('#book-form').validate({
    rules: {
      title: {
        required: true,
        minlength: 2
      },
      author: {
        required: true,
        minlength: 2
      },
      isbn: {
        required: true,
        minlength: 2
      }
    },
    messages: {
      title: {
        required: "A book has to have an Title",
        minlength: "Title must consist of at least two character"
      },
      author: {
        required: "A book has to have an Author",
        minlength: "Author name must consist of at least two character"
      },
      isbn: {
        required: "ISBN is required",
        minlength: "Should consist of at least two character" 
      }

    }
  })
})
*/

$(document).ready(() => {
  let $divAppend = $('#divAppend');// for index GET

  let $divAppendAdmin = $('#divAppendAdmin'); //for admin GET

  let $name = $('#name');
  let $species = $('#species');
  let $family = $('#family');
  let $class = $('#class');
  let $category = $('#sea');
  let $external = $('#external');
  let $image = $('#image');
  let $info = $('#info');



  //limit character lenght
  function limitChar(string) {
    if (string.length > 150) {
      return string.substring(0, 150) + '.....';
    }
  }

  function addAnimal(animal) {
    $divAppend.append(`<div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src=${animal.image} alt="Card image cap">
      <div class="card-body">
        <p class="card-text data-name">${animal.name}</p>
        <p class="card-text"><strong>Info: </strong> ${limitChar(animal.info)}</p>
        <p class="card-text"><strong>Species: </strong> ${animal.species}</p>
        <p class="card-text"><strong>Class: </strong> ${animal.class}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary external"><a href=${animal.external}>Link</a></button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `);
  }

  function addAnimalAdmin(animal) {
    $divAppendAdmin.append(`<div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src=${animal.image} alt="Card image cap">
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

  //Get all animals to index and admin dashboard
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/animals',
    success: function (animals) {
      $.each(animals, (i, animal) => {
        addAnimal(animal);
        addAnimalAdmin(animal);
      })
    },
    error: function () {
      alert('error loading orders');
    }
  });


  //POT new animal to Database
  $('#postSubmit').click(function (e) {
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
      url: 'http://localhost:3000/animals',
      data: animal,
      success: function (newAnimal) {
        addAnimal(newAnimal);
      },
      error: function () {
        alert('Error saving order')
      }
    })
  })

  //get for seachBox
  $('#search').click(function (e) {
    e.preventDefault();
    let $searchName = $('#searchName');
    $searchName = $searchName.val();

    $divAppend.empty();

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/animals?q=' + $searchName,
      success: function (animals) {
        $.each(animals, (i, animal) => {
          addAnimal(animal);
        })
      },
      error: function () {
        alert('error loading orders');
      }
    });
  });

  //get for seaAnimals
  $('#seaAnimal').click(function (e) {
    e.preventDefault();
    $divAppend.empty();

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/animals?category=sea',
      success: function (animals) {
        $.each(animals, (i, animal) => {
          addAnimal(animal);
        })
      },
      error: function () {
        alert('error loading orders');
      }
    });
  });

  //get for landAnimals
  $('#landAnimal').click(function (e) {
    e.preventDefault();
    $divAppend.empty();

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/animals?category=land',
      success: function (animals) {
        $.each(animals, (i, animal) => {
          addAnimal(animal);
        })
      },
      error: function () {
        alert('error loading orders');
      }
    });
  });

  //GET for exploreAll
  $('#exploreAll').click(function (e) {
    e.preventDefault();

    $divAppend.empty();

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/animals',
      success: function (animals) {
        $.each(animals, (i, animal) => {
          addAnimal(animal);
        })
      },
      error: function () {
        alert('error loading orders');
      }
    });
  });
})
