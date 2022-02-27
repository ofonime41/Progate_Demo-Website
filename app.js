const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const db=require('./dbConnection');

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

app.listen(3000);
