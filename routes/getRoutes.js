const express = require('express');
const getController = require('../controllers/getcontroller');
const router = express.Router();

router.get('/', getController.getLogin);
router.get('/main', getController.getMain);
router.get('/main/data', getController.getMainData);
router.get('/markets', getController.getMarkets);
router.get('/markets/data', getController.getMarketsData);
router.get('/updatemarket', getController.updateMarket);
router.get('/storages', getController.getStorages);
router.get('/storages/data', getController.getStoragesData);
router.get('/updatestorage', getController.getUpdateStorage);
router.get('/stock', getController.getStock);
router.get('/stock/data', getController.getStockData);
router.get('/profile', getController.getProfile);
router.get('/profile/data', getController.getProfileData);
router.get('/addproduct', getController.getAddProduct);

module.exports = router;