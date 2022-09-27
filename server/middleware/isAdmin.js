const HttpError = require('../models/httpError')

module.exports = (req, res, next) => {
	if (req.userData.isAdmin === true) {
		return next()
	}
	return next(new HttpError('Authentication failed', 401))
}
