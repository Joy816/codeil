const express = require('express');
const router = express.Router();

const userController = require ('../controllers/users_controller');
// const { route } = require('./posts');

router.get ('/', userController.users);
router.get ('/profile', userController.profile );
router.get ('/about', userController.about);


module.exports = router;