const express = require('express');
const session = require('express-session');
const app = express(); 
const bodyParser = require('body-parser');
const db=require('./dbConnection');
const sessionStorage=require('node-sessionstorage');
const { Router } = require('express');
const { end } = require('./dbConnection');
// const { set } = require('express/lib/application');

//views engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

app.get('/', (req,res)=>{

    res.render('index', {title:"Home"});
});

app.get('/about', (req,res)=>{

  res.render('about',{title:"About"});
});

app.get('/lessons', (req,res)=>{

  res.render('lessons',{title:"Lesson"});
});

app.get('/contact', (req,res)=>{

  res.render('contact',{title:"Contact"});
});

app.get('/login', (req,res)=>{

  res.render('login',{title:"login"});
});


app.get('/userPage', (req,res)=>{

  res.render('userPage',{title:"User"});
});



app.post( '/contact', (req,res,next)=>{
    let name = req.body.name;
  let e_mail = req.body.mail;
  var message= req.body.message;

  let querydb=`INSERT INTO contact(name,email, message) VALUES ("${name}", "${e_mail}", "${message}")`;

 db.query(querydb,(err, result)=>{
    if(err) throw err;
    console.log('Record inserted');
    res.redirect('/');

  })

});

//LOGIN USER
let userQuery = app.post( '/login', (req,res,next)=>{
  let e_mail = req.body.mail;
  let password= req.body.pass_wd;
  let querydb=`SELECT *FROM user WHERE email ="${e_mail}" AND password ="${password}";`;

  db.query(querydb,(err, result)=>{
    if(err) throw err;
    if(result.RowDataPacket=!null){
      console.log("user logged in");
      console.log(result[0]);
      
      app.get('/', (req,res)=>{
        sessionStorage.setItem('user',result[0]);
      let tagline= sessionStorage.getItem('user');
      res.render('index',{tagline:req.tagline} );
   
    })
    
};
    res.redirect('/');
  });
  
  
      
});

app.listen(3000);
