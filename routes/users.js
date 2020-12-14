const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require ('../controllers/users_controller');
// const { route } = require('./posts');

router.get ('/', userController.users);
router.get ('/profile', passport.checkAuthenticated , userController.profile );
router.get('/signin', userController.signin);
router.get('/signup', userController.signup);

router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), userController.createSession);

router.get('/signout', userController.destroySession);

module.exports = router;