const Beds = require('./bedMdl');
const Nurses = require('../Nurse/nurseCtrl');

// function changeBed(req,res,next){
// 	var oldBedNotes;
// 	Beds.update({ bed: req.body.oldBed }, { $set: { status: false }}, function(err, bed){
// 		if (err) return handleError(err);
// 		console.log(bed);
// 		oldBedNotes = bed.notes;
// 	});
// 	Beds.findAndUpdate({bed: req.body.newBed}, {$set { status: true}}, function(err){
// 		next();
// 	})
// }

// one-time instantiating and populating of all hospital beds
function populate(req, res) {
  const arr = req.body.beds.map( el => {
    return {'bed': el};
  });
  Beds.create(arr, function(err, result) {
    res.send('boohyah!!');
  });
}

// add a patient to a bed
function addBeds(req, res){
	var bedsToAdd = req.body.addBeds;
	bedsToAdd.forEach(function(bed){
		Beds.update({bed: bed}, {$set: { status: true }});
	});
	res.sendStatus('Patients added!')
}

// remove a patient from a bed
function emptyBeds(req,res){
	var bedsToEmpty = req.body.emptyBeds;
	bedsToEmpty.forEach(function(bed){
		Beds.update({bed: bed}, {$set: {status: false }});
	})
	res.sendStatus('Patients removed!')
}

// query beds DB for all occupied beds, sent to the shift generating middleware algorithm
function getOccupiedBeds(req,res,next){
	Beds.find({status:true}, 'bed', function(err, beds){
		if (err) throw err;
		console.log(beds);
		req.body.occupied = beds;
		next();
	});
}

module.exports = {addBeds, emptyBeds, populate, getOccupiedBeds};
