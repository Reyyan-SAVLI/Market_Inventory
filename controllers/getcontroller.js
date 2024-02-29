const path = require('path');
const db = require('../models/conn');

const getLogin = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/login.html');
    res.sendFile(filePath, (err)=>{
      if (err) {
          console.log(err);
      }
    });
}

const getMain = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/main.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

const getMainData = (req, res)=>{
    const sql = 'SELECT * FROM products_main';
     db.query(sql, (err, result)=>{
       if(err) throw err;
  
       res.json(result);
     });
}

const getMarkets = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/markets.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

const getMarketsData = (req, res)=>{
    const sql = 'SELECT * FROM markets m INNER JOIN products_market p ON m.id = p.market_id';
     db.query(sql, (err, result)=>{
       if(err) throw err;
  
       res.json(result);
     });
}

const updateMarket = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/updatemarket.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

const getStorages = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/storages.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

const getStoragesData = (req, res)=>{
    const sql = 'SELECT * FROM storages s INNER JOIN products_storage p ON s.id = p.storage_id';
     db.query(sql, (err, result)=>{
       if(err) throw err;
  
       res.json(result);
     })
}

const getUpdateStorage = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/updatestorage.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

const getStock = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/stock.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

const getStockData = (req, res)=>{
    const sql = 'SELECT DISTINCT p.productcode, p.name, p.amount, m.marketname, m.marketcode , pm.products_market_amount,'+
    'ps.products_storage_amount , s.storagename ,s.storagecode FROM main_stock a INNER JOIN '+ 
    'products_main p ON p.id = a.product_id INNER JOIN '+
    'markets m ON m.id = a.market_id INNER JOIN '+
    'storages s ON s.id = a.storage_id INNER JOIN '+
    'products_market pm ON pm.market_id = m.id INNER JOIN '+
    'products_storage ps ON ps.storage_id = s.id';
     db.query(sql, (err, result)=>{
       if(err) throw err;
  
      res.json(result); 
     });
}

const getProfile = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/profile.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

const getProfileData = (req, res)=>{
    const sql = 'SELECT * FROM users';
     db.query(sql, (err, result)=>{
       if(err) throw err;
  
       res.json(result);
     })
}

const getAddProduct = (req, res)=>{
    const filePath = path.join(__dirname, '../pages/addproduct.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
}

module.exports = {
    getLogin: getLogin,
    getMain: getMain,
    getMainData: getMainData,
    getMarkets: getMarkets,
    getMarketsData: getMarketsData,
    updateMarket: updateMarket,
    getStorages: getStorages,
    getStoragesData: getStoragesData,
    getUpdateStorage: getUpdateStorage,
    getStock: getStock, 
    getStockData: getStockData,
    getProfile: getProfile,
    getProfileData: getProfileData,
    getAddProduct: getAddProduct
};