console.log('hello from JS');

$(document).ready(onReady);

function onReady() {
    console.log('hello from JQ');
    $('#submitNewTask').on('click' , newTaskSubmission)
    $('#taskRowBody').on('click' , '.delete' , taskDelete )
    $('#completed').on('click' , '.delete' , taskDelete)
    $('#taskRowBody').on('click' , '.finished' , taskComplete, removeTask)
    $('#taskRowBody').on('click', '.finished' , moveTask )
    taskHistory();
}




// post request that receives input values from DOM and sends to server
function newTaskSubmission () {
    let taskID = {
        task: $('#taskInput').val()
       }
        $.ajax({
         type:'POST',
         url: '/taskRoutes',
         data: taskID
         }).then(function(response){
            $('#taskInput').val(''),
            $('#taskRowBody').empty(''); // empty out the table before new tasks are displayed on the DOM
             taskHistory(); // taskHistory is whats loading the database entries onto the DOM
         });
    }

// get request to get data from database
function taskHistory () {
    $('#taskRowBody').empty(); // emptys out the DOM before the same data is reloaded
    $.ajax({
        type: 'GET',
        url: './taskRoutes'
     }).then(function(response){
             console.log('any reponse?!' , response);
            tasksOnTheDom(response);
      }).catch(function(error){
          console.log(error);
          
      });
}

// appends server data to the DOM
function tasksOnTheDom(response) {
    for (let index = 0; index < response.length; index++) {
        $('#taskRowBody').append(`
        <ul>
        <li data-id=${response[index].id}>
            ${response[index].task}
            <button id="delete" class="delete">delete</button>
            <button class="finished">Done Yet?</button>
            </li>
            </ul>
          `);
  }}


// PUT request to update database with 
function taskComplete(){
    let taskID = $(this).closest('li').data('id');
    console.log('hello from taskComplete' , taskID);
    $.ajax({
        method: 'PUT',
        url:`/taskRoutes/taskFinished/${taskID}`,
        data:  {
            taskFinished: true
        } // established that the task was complete and sends that data to the database
    }).then(function(response){
        console.log(response);
        taskHistory();
    }).catch(function(error){
        console.log(error);
     });
}

  // deletes task from DOM and Database by ID number
  function taskDelete () {
      let taskID = $(this).closest('li').data('id');
      console.log('hello from taskDelete' , taskID);
      
      $.ajax({
          method: 'DELETE',
          url:`/taskRoutes/${taskID}`
      }).then(function(response){
        console.log(response);
        taskHistory();

      }).catch(function(error){
          console.log(error);
          
      });
  }

  // moves task list item to "you did it!" section
function moveTask() {
    
   let completedTask = $(this).parent();
   $('#completed').append(completedTask);
   
    }

    function removeTask(){
        $(this).parent().remove();
        taskHistory();
    }

 