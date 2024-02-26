const express = require('express');
const path = require('path');
const app = express();
const db = require('./models/conn');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const port = 3000;

app.use(express.static(path.join(__dirname, 'pages')));
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use((express.urlencoded({extended: true})));

app.get('/', (req, res)=>{
  const filePath = path.join(__dirname, 'pages/login.html');
  res.sendFile(filePath, (err)=>{
    if (err) {
        console.log(err);
    }
  });
});

app.post('/', (req, res)=>{
   const email = req.body.uname;
   const password = req.body.psw;

   const sql = 'SELECT * FROM users WHERE email= ? AND password= ?';

   db.query(sql, [email, password], (err, result)=>{
    if(err) throw err;

    if (result.length > 0) {
        res.redirect('/main');
      } else {
        res.send('Kullanıcı Adı veya Şifre Hatalı');
      }
   });
});

app.get('/main', (req, res)=>{
   const filePath = path.join(__dirname, 'pages/main.html');
   res.sendFile(filePath, (err)=>{
    if(err){
      console.log(err);
    }
   });
});

app.get('/main/data', (req, res)=>{
  const sql = 'SELECT * FROM products';
   db.query(sql, (err, result)=>{
     if(err) throw err;

     res.json(result);
   })
  });

app.get('/markets', (req, res)=>{
  const filePath = path.join(__dirname, 'pages/markets.html');
  res.sendFile(filePath, (err)=>{
   if(err){
     console.log(err);
   }
  });
});

app.get('/markets/data', (req, res)=>{
  const sql = 'SELECT * FROM markets m INNER JOIN products p ON m.productid = p.id';
   db.query(sql, (err, result)=>{
     if(err){
      throw err;
     }else{
      const itemsBelow100 = result.filter(item => item.amount < 100);
            res.json({ marketData: result, itemsBelow100 });
     }
     
   })
  });

app.get('/storages', (req, res)=>{
  const filePath = path.join(__dirname, 'pages/storages.html');
  res.sendFile(filePath, (err)=>{
   if(err){
     console.log(err);
   }
  });
});

app.get('/storages/data', (req, res)=>{
  const sql = 'SELECT * FROM storages s INNER JOIN products p ON s.productid = p.id';
   db.query(sql, (err, result)=>{
     if(err) throw err;

     res.json(result);
   })
  });

app.get('/stock', (req, res)=>{
  const filePath = path.join(__dirname, 'pages/stock.html');
  res.sendFile(filePath, (err)=>{
   if(err){
     console.log(err);
   }
  });
});

app.get('/stock/data', (req, res)=>{
  const sql = 'SELECT * FROM storages s INNER JOIN markets m ON s.marketid = m.id INNER JOIN products p ON s.productid = p.id ';
   db.query(sql, (err, result)=>{
     if(err) throw err;

    
    res.json(result);

   })
  });

app.get('/profile', (req, res)=>{
  const filePath = path.join(__dirname, 'pages/profile.html');
  res.sendFile(filePath, (err)=>{
   if(err){
     console.log(err);
   }
  });
});

app.get('/profile/data', (req, res)=>{
  const sql = 'SELECT * FROM users';
   db.query(sql, (err, result)=>{
     if(err) throw err;

     res.json(result);
   })
  });

  app.post('/profile', (req, res)=>{
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
  });

  app.get('/addproduct', (req, res)=>{
    const filePath = path.join(__dirname, 'pages/addproduct.html');
    res.sendFile(filePath, (err)=>{
     if(err){
       console.log(err);
     }
    });
  });

  app.post('/addproduct', (req, res) => {
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
    const sql = 'INSERT INTO products (name, imagepath, brand, barcode, price, kdvratio, productcode, amount, category, subcategory) VALUES (?,?,?,?,?,?,?,?,?,?)';
  
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
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});