const express = require('express');
const path = require('path');
const app = express();
const db = require('./models/conn');
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static(path.join(__dirname, 'pages')));
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
  const sql = 'SELECT * FROM markets';
   db.query(sql, (err, result)=>{
     if(err) throw err;

     res.json(result);
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
  const sql = 'SELECT * FROM storages';
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
  const sql = 'SELECT s.name, s.storagecode, s.city, m.name, m.marketcode, m.city, p.name, p.amount FROM marketinventory.storages s INNER JOIN marketinventory.markets m ON s.marketid = m.id INNER JOIN marketinventory.products p ON s.productid = p.id ';
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

     console.log(result);
     res.json(result);
   })
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});