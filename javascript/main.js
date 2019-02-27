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
  let $divAppend = $('#divAppend'); //$booklist
  let $name = $('#name'); //tittle
  let $species = $('#species');
  let $family = $('#family');
  let $class = $('#class');
  let $category = $('#sea');
  let $external = $('#external');
  let $image = $('#image');
  let $info = $('#info');


  /*
  $bookLists.append(`<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" data-id = ${book.id} class="btn btn-danger btn-sm delete">X</a></td>
    </tr>
    `
  */

  function addAnimal(animal) {
    //<small class="text-muted">9 mins</small>   and <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
    $divAppend.append(`<div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src=${animal.image} alt="Card image cap">
      <div class="card-body">
        <p class="card-text">${animal.info}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `);
    console.log(animal.image)
  }

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/animals',
    success: function (animals) { //animals == booklists && book == animal
      $.each(animals, (i, animal) => {
        addAnimal(animal);
      })
    },
    error: function () {
      alert('error loading orders');
    }
  });

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



    // $bookLists.delegate('.delete','click', function(e) { //.delete has not been added to the page yet hence 
    //   e.preventDefault();
    //   let $tr = $(this).closest('tr');

    //   $.ajax({
    //     type: 'DELETE',
    //     url: 'http://localhost:3000/bookLists/' + $(this).attr('data-id'),
    //     success: function() {
    //       $tr.fadeOut(300, function() {
    //         $(this).remove();
    //       })
    //     }
    //   })
    // })
})
