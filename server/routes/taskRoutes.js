const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

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