const Nurses = require('./nurseMdl');

function index(req, res) {
  Nurses.find({}, function(err,nurses){
    if (!nurses) res.sendStatus(404);
    else res.json(nurses);
  })
}

function show(req, res) {
  Nurses.findOne({name: req.body.first}, function(err, nurse){
    if(!nurse) res.sendStatus(404);
    else res.json(nurse);
  })
}

function post(req, res) {
  Nurses.create({first: req.body.first, last: req.body.last}, function(err, result){
    res.send('posted');
  })
}

function remove(req, res) {
  Nurses.remove({first: req.body.first, last: req.body.last}, function(err, result) {
    res.send('deleted');
  })
}

module.exports = { index, show, post, remove };
