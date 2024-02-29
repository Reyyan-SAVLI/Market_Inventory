const express = require('express');
const postController = require('../controllers/postcontroller');
const router = express.Router();

router.post('/updatemarket',postController.postUpdateMarket);
router.post('/updatestorage', postController.postUpdateStorage);
router.post('/profile', postController.postProfile);
router.post('/addproduct', postController.postAddProduct);


module.exports = router;