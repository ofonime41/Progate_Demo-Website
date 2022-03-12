const express = require('express');
const session = require('express-session');
const app = express(); 
const bodyParser = require('body-parser');
const db=require('./dbConnection');
const sessionStorage=require('node-sessionstorage');
const router = express.Router();

//views engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

app.get('/', (req,res)=>{
   let session=sessionStorage.getItem('user');
    res.render('index', {title:"Home",session:session});
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
  res.render('login',{title:"login",session:null});
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
      sessionStorage.setItem('user',result[0]);
      res.redirect('/');
    };

  });
    
});

app.get('/logout',(req,res)=>{
  sessionStorage.setItem('user',null);
  res.redirect('/');
});

app.listen(3000);
