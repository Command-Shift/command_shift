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
  const arr = req.body.beds.map(el => {
    return { bed: el };
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
	Beds.find({ status: true }, 'bed', function(err, beds){
		if (err) throw err;
		const arr = beds.map(el => el.bed);
    console.log(arr);
		req.body.occupied = arr;
		next();
	});
}

function assign(req, res, next) {
  function shuffle(a) { // suffles arrays
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }
  function randomSpread(arr) { // randomize spread
    let arr1 = [];
    let arr2 = [];
    let res = [];
    for (let i = 0; i < arr[0]; i++) {
      arr1.push(arr[1]);
    }
    for (let i = 0; i < arr[2]; i++) {
      arr2.push(arr[3])
    }
    res = arr1.concat(arr2);
    shuffle(res);
    return res;
  }
  // assign algorithm
  const occupied = [...req.body.occupied];
  const nurses = req.body.onDuty;
  const census = occupied.length;
  const assignment = [];
  if (census % nurses.length === 0) {
    // even spread
    const patientsPer = census / nurses.length;
    let j = 0;
    let k = patientsPer;

    for (let i = 0; i < nurses.length; i++) {
      assignment.push(occupied.slice(j, k));
      j += patientsPer;
      k += patientsPer;
    }
  } else {
    // uneven spread
    const longRuns = census % nurses.length;
    const shortRuns = nurses.length - census % nurses.length;
    const longPatientsPer = Math.floor(census / nurses.length) + 1;
    const shortPatientsPer = Math.floor(census / nurses.length);
    const spread = randomSpread([shortRuns, shortPatientsPer, longRuns, longPatientsPer]);

    for (let i = 0; i < nurses.length; i++) {
      assignment.push(occupied.splice(0, spread.shift()));
    }
  }
  req.body.assignment = assignment;

  next();
}

module.exports = { addBeds, emptyBeds, populate, assign, getOccupiedBeds };
