const pg = require ('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app', // the name of the database
    host: 'localhost', // where the database is located
    port: 5432, // postgres default port
    max: 10,
    idleTimeoutMillis: 30000 // 40 seconds to connect
});

pool.on('connect', ()=>{
    console.log('postgresql is connected!!'); // lets us know is postgresql is connected!
});

pool.on('error', (error) =>{
    console.log('error with postgres' , error); // alerts us to postgresql errors 
});

module.exports = pool; // exporting pool! 