const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const users = require('./server/users');
const loby = require('./server/loby');
const app = express();

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 269999999999 } }));
app.use(bodyParser.text());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use('/users', users);
app.use('/loby', loby);

app.listen(3000, console.log('Domino app listening on port 3000!'));
