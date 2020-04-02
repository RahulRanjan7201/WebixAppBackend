
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./src/controller/user');
const roleController = require('./src/controller/role');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  console.log('info', 'Request from : ', req.get('host'), 'for ', req.originalUrl);
  next();
});


app.use('/api/v1/roles', roleController);
app.use('/api/v1/users', userController );
// error handlers
process.on('uncaughtException', function (err) {
  console.log(err);
})
module.exports = app;