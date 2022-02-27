const sql = require('mysql');
const db = sql.createConnection({
    host:'localhost',
      user:'root',
      password:'',
      port:3306,
      database:'nodejs_demo',
  });
    
  
  db.connect((err) => {
  
    if (err) {
  
      throw err;
  
    }
  
    console.log("MySql Connected");
  
  });

  module.exports=db;