console.log('hello from JS');

$(document).ready(onReady);

function onReady() {
    console.log('hello from JQ');
    $('#submitNewTask').on('click' , newTaskSubmission)
}


// post request that receives input values from DOM and sends to server
function newTaskSubmission () {
    console.log('whats up from newTaskSubmission');
    let newTaskObject = {
        task: $('#taskInput').val(),
        dueBy:$('#dueDateInput').val()
    }
    $.ajax({
        type:'POST',
        url: './taskRoutes',
        data: newTaskObject
         }).then(function(response){
            $('#taskInput').val(''),
             $('#dueDateInput').val(''),
             taskHistory();
                });
}

// get request to get data from database
function taskHistory () {
    $('#taskRowBody').empty(); // emptys out the DOM before the same data is reloaded
    $.ajax({
        type: 'GET',
        url: '/taskRoutes'
     }).then(function(response){
             console.log('any reponse?!' , response);
             for (let index = 0; index < response.length; index++) {
              $('#taskRowBody').append(`
              <tr>
                 <td>${response[index].task}</td>
                 <td>${response[index].dueBy}</td>
                </tr>
              `);   
             }
      });
}