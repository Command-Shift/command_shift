const Nurses = require('./nurseMdl');

function index(req, res) {
  Nurses.find({}, function(err,nurses){
    if (!nurses) res.sendStatus(404);
    else res.json(nurses);
  })
}

function show(req, res) {
  Nurses.findOne({first: req.body.first, last: req.body.last}, function(err, nurse){
    if(!nurse) res.sendStatus(404);
    else res.json(nurse);
  })
}

// create new nurse doc in Nurses collection -- HIRED!
function add(req, res) {
  Nurses.create({first: req.body.first, last: req.body.last}, function(err, result){
    res.send('posted');
  })
}

// remove nurse doc from Nurses collection -- FIRED :(
function remove(req, res) {
  Nurses.remove({first: req.body.first, last: req.body.last}, function(err, result) {
    res.send('deleted');
  })

}

// function updateBed(req,res){
//   console.log(req.body);
//   Nurses.update({beds: req.body.oldBed}, {$set: req.body.newBed}, function(err){
//     if (err) throw err;
//   });
// }

// updates nurse docs in nurse DB with new shift assignments
function sendAssignment(req, res, next){
  console.log('in sendassignment');
  console.log(req.body);
  var shifts = req.body.assignment;
  var onDuty = req.body.onDuty;
  onDuty.forEach(function(nurse, index){
    var name = nurse.split(' ');
    Nurses.update({first: name[0], last: name[1]}, {$set: shifts[index]});
  })
  res.json(req.body.assignment);
}

module.exports = { index, show, add, remove, sendAssignment };
