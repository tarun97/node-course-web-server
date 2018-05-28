const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}, ${req.method}, ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+' \n',(error)=>{
    if(error){
      console.log('unable to process request');
    }
  });
 next();
});
app.use((req,res,next)=>{
  res.render('mantainence.hbs',{
    welcomeMessage:'we will be back soon',
    pageTitle:'mantainence'
  })
});
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIT',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    welcomeMessage:'welcome here!',
    pageTitle:'home page',

  })
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',

  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errormessage:'unable to process request'
  });
});
app.listen(3000,()=>{
  console.log('server is up at port 3000');
});
