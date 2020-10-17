const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');




router.post('/' , (req, res) => { // sending the stuff
    console.log('req.body' , req.body);
    let task = req.body.task;
    let dueBy = req.body.dueBy;
    
    let queryText = `INSERT INTO "tasks" ("task" , "dueBy")
    VALUES('${task}','${dueBy}');`;

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
    let queryText = `SELECT * FROM "tasks"`;
    pool.query(queryText).then((result) => {
        res.send(result.row); // result.row give us the table rows from our database 
    }).catch((error) =>{
        console.log('you got an error in the get request' , error);
        res.sendStatus(500); 
    });
});





module.exports = router;