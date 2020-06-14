var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require("passport");
var users = require('./routes/api/users')
var cors = require('cors')
const app = express();
app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
);

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect (
    db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Coonected Successfully'))
.catch(() => console.log("Error Occurred"));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);
const port = process.env.PORT ||  8080 ;

app.listen(port, () => console.log('Server is running at 8080'));