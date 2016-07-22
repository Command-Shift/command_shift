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

function add(req, res) {
  Nurses.create({first: req.body.first, last: req.body.last}, function(err, result){
    res.send('posted');
  })
}

function remove(req, res) {
  Nurses.remove({first: req.body.first, last: req.body.last}, function(err, result) {
    res.send('deleted');
  })

}

function updateBed(req,res){
  console.log(req.body);
  Nurses.update({beds: req.body.oldBed}, {$set: req.body.newBed}, function(err){
    if (err) throw err;
  });
}

function assign(req, res, next){
  // assign function creates nested arrays of beds
  // send array of nurse names and array of bed arrays to function addShifts
  shift(nurses, beds)
}

function shift(nurses, beds){
  nurses.forEach(function(nurse, index){
    Nurses.update({first:,last:}, {$set: beds[index]})
  })
}
module.exports = { index, show, post, remove };
