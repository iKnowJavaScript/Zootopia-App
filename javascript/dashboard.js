$(document).ready(function() {
    $('#myTab a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    const monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    const dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    const newDate = new Date();
    newDate.setDate(newDate.getDate());    
    $('#date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());


    let $divAppendEdit = $('#divAppendEdit');

    function addAnimalAdmin(animal) {
        $divAppendEdit.append(`<div class="col-md-4" data-id=${animal.id}>
        <div class="card mb-4 box-shadow">
          <img class="card-img-top noedit" src=${animal.image} alt="Card image cap">
          <div class="card-body">
            <p class="card-text noedit info">${animal.info}</p>
            <input class="edit info" />
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary noedit editButton">Edit   </button>
                <button type="button" data-id=${animal.id} class="btn btn-sm btn-outline-secondary remove noedit">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-secondary edit save">Save</button>
                <button type="button" class="btn btn-sm btn-outline-secondary edit cancel"Cancel</button>
                
                </div>
            </div>
          </div>
        </div>
      </div>
        `);
      }
    //to search for an animal
    $('#editTab').click(function (e) {
        e.preventDefault();
        let $editSearch = $('#editSearch');
        $editSearch = $editSearch.val();
    
        $divAppendEdit.empty();
    
        $.ajax({
          type: 'GET',
          url: 'http://localhost:3000/animals?q=' + $editSearch,
          success: function (animals) { //animals == booklists && book == animal
            $.each(animals, (i, animal) => {
              addAnimalAdmin(animal);
            })
          },
          error: function () {
            alert('error loading orders');
          }
        });
      });

      //delete animal
          $divAppendEdit.delegate('.remove','click', function(e) { //.delete has not been added to the page yet hence 
            e.preventDefault();
            let $div = $(this).closest('div');
      
            $.ajax({
              type: 'DELETE',
              url: 'http://localhost:3000/animals/' + $(this).attr('data-id'),
              success: function() {
                $div.fadeOut(300, function() {
                 $(this).remove();
                })
              }
            })
          })

          //edit animal
          $divAppendEdit.delegate('.editButton','click', function(e) { //.delete has not been added to the page yet hence 
            e.preventDefault();
            let $div = $(this).closest('div');
            $div.find('input.info').val($div.find('p.info').html() ) //same for oothers
            $div.addClass('edit');
          })

          $divAppendEdit.delegate('.cancel','click', function(e) { 
             e.preventDefault();
            $(this).closest('div').removeClass('edit');
          })

          $divAppendEdit.delegate('.cancel','click', function(e) { 
            e.preventDefault();
            let $div = $(this).closest('div');
            let animal = {
                info: $div.find('input.info').val()
            };

           $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/animals/' + $div.attr('data-id'),
            data: animal,
            success: function(newAnimal) {
                $div.find('p.info').html(animal.info); //same for others

                $div.removeClass('edit');
            },
            error: function(){
                alert('Error updating order')
            }
          })
         })

          
})





// function addAnimalAdmin(animal) {
//     $divAppendEdit.append(`<div class="col-md-4">
//     <div class="card mb-4 box-shadow">
//       <img class="card-img-top" src=${animal.image} alt="Card image cap">
//       <div class="card-body">
//         <p class="card-text">${animal.info}</p>
//         <div class="d-flex justify-content-between align-items-center">
//           <div class="btn-group">
//             <button type="button" class="btn btn-sm btn-outline-secondary">Edit   </button>
//             <button type="button" data-id=${animal.id} class="btn btn-sm btn-outline-secondary remove">Delete</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//     `);
//   }