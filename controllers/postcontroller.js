const db = require('../models/conn');

const postUpdateMarket = (req, res)=>{
    const pMCode = req.body.pMCode;
    const pMAmount = req.body.pMAmount;
    const mCode = req.body.mCode;
    const sql = 'UPDATE markets INNER JOIN products_market ON markets.id = products_market.market_id '+
    'SET products_market_amount = products_market_amount + ? WHERE products_market_productcode = ? AND marketcode = ?';
    const sql2 = 'UPDATE storages INNER JOIN markets ON storages.id = markets.storage_id '+
    'INNER JOIN products_storage ON products_storage.storage_id = storages.id '+
    'SET products_storage.products_storage_amount = products_storage.products_storage_amount - ? '+
    'WHERE products_storage.products_storage_productcode = ? AND markets.marketcode = ?';
    db.query(sql, [pMAmount,pMCode,mCode], (err, result)=>{
       if(err) throw err;
      
       db.query(sql2, [pMAmount, pMCode, mCode], (err, result)=>{
        if(err) throw err;
        
        res.redirect('/markets');
       });
    });

}

const postUpdateStorage = (req, res)=>{
    const pSCode = req.body.pSCode;
    const pSAmount = req.body.pSAmount;
    const sCode = req.body.sCode;
    const sql = 'UPDATE products_storage INNER JOIN storages ON products_storage.storage_id = storages.id '+
    'SET products_storage_amount = products_storage_amount + ? WHERE products_storage_productcode = ? AND storagecode = ?';
    const sql2 = 'UPDATE main_stock INNER JOIN products_main ON main_stock.product_id = products_main.id INNER JOIN '+
    'storages ON main_stock.storage_id = storages.id SET amount = amount - ? '+
    'WHERE productcode = ? AND storagecode = ?';
    db.query(sql, [pSAmount,pSCode,sCode], (err, result)=>{
      if(err) throw err;
     
      db.query(sql2, [pSAmount, pSCode, sCode], (err, result)=>{
       if(err) throw err;
       
       res.redirect('/storages');
      });
   });

}

const postProfile = (req, res)=>{
    const sql = 'UPDATE users SET name = ?, surname = ?, email = ?, phone = ?, password = ? ';
    const name = req.body.txtname;
    const surname = req.body.txtsurname;
    const email = req.body.txtemail;
    const phone = req.body.txtphone;
    const psw = req.body.txtpsw;
    db.query(sql, [name, surname, email, phone, psw], (err, result)=>{
      if(err) throw err;
 
      res.redirect('/profile');
      console.log('Bilgiler güncellendi.');
    });
}

const postAddProduct = (req, res) => {
    const pName = req.body.pName;
    const pBrand = req.body.pBrand;
    const pBarcode = req.body.pBarcode;
    const pPrice = req.body.pPrice;
    const pKdv = req.body.pKdv;
    const pCode = req.body.pCode;
    const pAmount = req.body.pAmount;
    const pCategory = req.body.pCategory;
    const pSubcategory = req.body.pSubcategory;
    const pImage = `/assets/${req.files.pImage.name}`;
    const sql = 'INSERT INTO products_main (name, imagepath, brand, barcode, price, kdvratio, productcode, amount, category, subcategory) VALUES (?,?,?,?,?,?,?,?,?,?)';
  
    if (req.files.pImage.mimetype !== 'image/jpeg') {
      return res.status(400).send('Sadece JPG formatlı resimler kabul edilir.');
    }
  
    req.files.pImage.mv(__dirname + '/pages/assets/' + req.files.pImage.name, (mvErr) => {
      if (mvErr) {
        return res.status(500).send(mvErr);
      }
  
      db.query(sql, [pName, pImage, pBrand, pBarcode, pPrice, pKdv, pCode, pAmount, pCategory, pSubcategory], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Veritabanına kaydedilirken bir hata oluştu.');
        }
        console.log('Kayıt Oluşturuldu');
        res.redirect('/main');
      });
    });
}

module.exports = {
    postUpdateMarket: postUpdateMarket,
    postUpdateStorage: postUpdateStorage,
    postProfile: postProfile,
    postAddProduct: postAddProduct
};