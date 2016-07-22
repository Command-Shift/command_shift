const Beds = require('./bedMdl');

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

// add a patient
function addBeds(req, res){
	var bedsToAdd = req.body.addBeds;
	bedsToAdd.forEach(function(bed){
		Beds.update({bed: bed}, {$set: { status: true }});
}

// remove a patient
function emptyBeds(req,res){
	var bedsToEmpty = req.body.emptyBeds;
	bedsToEmpty.forEach(function(bed){
		Beds.update({bed: bed}, {$set: {status: false }});
	})
}

module.exports = {addBeds, emptyBeds };