const express = require('express');
const { query } = require('../modules/pool');
const router = express.Router();
const pool = require('../modules/pool');




router.post('/' , (req, res) => { // sending the stuff
    console.log('req.body from the POST request' , req.body);
    let task = req.body.task;
    let dueBy = req.body.dueBy;
    
    let queryText = `INSERT INTO "tasks" ("task" , "dueBy")
    VALUES ('${task}','${dueBy}');`;

    pool.query(queryText).then((result) => {
    res.sendStatus(200);
    }).catch((error) => {
     console.log(error);
     res.sendStatus(500);
    })
});




// get request to get data from our database
router.get('/' , (req, res) => {
    console.log('in get request!!' , req.body);
    let queryText = `SELECT * FROM "tasks";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows); // result.row give us the table rows from our database 
    }).catch((error) =>{
        console.log('you got an error in the get request' , error);
        res.sendStatus(500); 
    });
});


router.delete('/:id' , (req , res) =>{
    let taskID = req.params.id; // taskID will use req.params.id to match client ID with database ID
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(queryText, [taskID]).then((result) =>{
        console.log('results from GET DELETE' , result);
        res.sendStatus(200);   
    }).catch((error) => {
        console.log('error in the DELETE' , error);
        res.sendStatus(500);
    })
})


router.put('/taskFinished/:id' , (req , res) => {
    let taskID = req.params.id;
    let taskFinished = req.body.taskFinished;

    let queryText = `UPDATE "tasks" set "taskComplete" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [taskFinished , taskID]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in PUT', error);
        res.sendStatus(500);
    });
});

module.exports = router;