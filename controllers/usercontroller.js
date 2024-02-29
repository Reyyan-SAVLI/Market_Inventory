const db = require('../models/conn');

const signIn = (req, res)=>{
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
}

module.exports = {
    signIn: signIn
};