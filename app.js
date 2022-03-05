const express = require('express');
const session = require('express-session');
const app = express(); 
const bodyParser = require('body-parser');
const db=require('./dbConnection');
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
    // res.send("login erro");
    
   let stat=()=>{
     if(result){
    console.log(req.body);
    console.log(result);
    res.send("login sucessful");
    
   }
   else{
     res.send("login unsucessful"); return false; }
  }
  })
  
});




app.listen(3000);
