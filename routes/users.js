const express = require('express');
const router = express.Router();

const userController = require ('../controllers/users_controller');
// const { route } = require('./posts');

router.get ('/', userController.users);
router.get ('/profile', userController.profile );
router.get('/signin', userController.signin);
router.get('/signup', userController.signup);

router.post('/create', userController.create);


module.exports = router;