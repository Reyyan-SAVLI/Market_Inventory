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

app.post('/main', (req, res)=>{
  
});

app.get('/products', (req, res)=>{
  const filePath = path.join(__dirname, 'pages/main.html');
  res.sendFile(filePath, (err)=>{
   if(err){
     console.log(err);
   }
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});