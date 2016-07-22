const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nurseCtrl = require('./Nurse/nurseCtrl');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Build/index.html');
});

app.delete('/nurse', nurseCtrl.remove);
app.get('/nurses', nurseCtrl.index);
app.post('/nurse', nurseCtrl.post);


app.listen(3000, function () {
  console.log('Express listening on port 3000');
});

module.exports = app;

function l(...args) {
  console.log(...args);
}
