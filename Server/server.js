const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nurseCtrl = require('./Nurse/nurseCtrl');
const bedCtrl = require('./Bed/bedCtrl');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('Build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Build/index.html');
});

app.delete('/nurse', nurseCtrl.remove);
app.get('/nurses', nurseCtrl.index);
app.post('/nurse', nurseCtrl.add);
// app.post('/changeBed', bedCtrl.changeBed, nurseCtrl.changeBed);
app.post('/addBeds', bedCtrl.addBeds);
app.post('/emptyBeds', bedCtrl.emptyBeds);
app.post('/assign', bedCtrl.getOccupiedBeds, bedCtrl.assign, nurseCtrl.sendAssignments)
// app.post('/assign', nurseCtrl.assign);
app.post('/populate', bedCtrl.populate);
app.post('/getAssignments', nurseCtrl.postAssignment);
app.post('/clear', nurseCtrl.clearAssignment);

app.listen(3000, function () {
  console.log('Express listening on port 3000');
});

module.exports = app;

function l(...args) {
  console.log(...args);
}
