const mysql = require('mysql');
const connection = mysql.createConnection({
host:'localhost',
user:'root',
password:'1234',
database:'marketinventory'
});

connection.connect((err)=>{
    if (err) {
        console.log('There is an error', err);
    }
    else{
    console.log('Connected');}
})

const db = connection;

module.exports = db;