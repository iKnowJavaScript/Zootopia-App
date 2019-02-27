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
  let $bookLists = $('#book-list');
  let $title = $('#title');
  let $author = $('#author');
  let $isbn = $('#isbn');

  function addBook(book) {
    $bookLists.append(`<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" data-id = ${book.id} class="btn btn-danger btn-sm delete">X</a></td>
    </tr>
    `);
  }

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/bookLists',
    success: function (bookLists) {
      $.each(bookLists, (i, book) => {
        addBook(book);
      })
    },
    error: function () {
      alert('error loading orders');
    }
  });

  $('#add-book').click(function(e) {
    e.preventDefault();

    const book = {
      title: $title.val(),
      author: $author.val(),
      isbn: $isbn.val()
    };

    $('#book-form').trigger("reset");

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/bookLists',
      data: book,
      success: function(newBook) {
        addBook(newBook);
      },
      error: function() {
        alert('Error saving order')
      }
    })
  })
  $bookLists.delegate('.delete','click', function(e) { //.delete has not been added to the page yet hence 
    e.preventDefault();
    let $tr = $(this).closest('tr');

    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/bookLists/' + $(this).attr('data-id'),
      success: function() {
        $tr.fadeOut(300, function() {
          $(this).remove();
        })
      }
    })
  })
})