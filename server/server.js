const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));

// getting info from bookRouter
let taskRouter = require('./routes/taskRoutes')
app.use('/taskRoutes', taskRouter);

app.use(express.static('server/public'));


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});