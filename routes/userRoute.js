const express = require('express');
const userController = require('../controllers/usercontroller');
const router = express.Router();

router.post('/',userController.signIn);

module.exports = router;