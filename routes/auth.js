var express = require('express');
var router = express.Router();
var passport = require('passport');
var isNotAuth = require('../middlewares/authorize').isNotAuth;
var db = require("../config/db");

/* GET login page. */
router.get('/login', isNotAuth, function(req, res, next) {
  res.render('login');
});

/* POST login data. */
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/error',
}));

/* GET logout. */
router.get('/logout', (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
});

/* GET register page. */
router.get('/register', isNotAuth, (req, res, next) => {
	res.render('register');
});

/* POST register data. */
router.post('/register', isNotAuth, (req, res, next) => {
	db('users').insert(req.body).then( (ids) => {
		passport.authenticate('local')(req, res, function() {
			res.redirect('/');
		});
	}, next);
});

module.exports = router;