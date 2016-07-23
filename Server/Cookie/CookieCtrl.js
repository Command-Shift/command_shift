function setCookie(req, res, next){
	const name = req.body.first + ' ' + req.body.last;
	res.cookie('nurse', name, {httpOnly: true});
	next();
}

module.exports = {setCookie};
