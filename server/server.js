const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

// getting info from Router
let taskRouter = require('./routes/taskRoutes');
app.use('/taskRoutes', taskRouter);

app.use(express.static('server/public'));


app.listen(port, () => {
    console.log('listening on port', port)
});