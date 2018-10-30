const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();
console.log(__dirname + '/public')

app.set('view engine','hbs');


app.use((req,res,next) => {
  console.log("inside use");

  var now=new Date().toString();
  var log= `${now} ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile("Log.txt",log + "\n",(err)=>{
    if(err){
      console.log("Error in wriiting in to Log.txt")
    }
  })
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs',{
//     Maintenance:'Maintenance'
//   })
// })

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})

hbs.registerHelper(('ScreamIt'),(text)=>{
  return text.toUpperCase();
});
app.get('/Projects',(req,res)=>{
  res.render('projects.hbs')
})
app.get('/',(req,res)=>{
  console.log("inside get");
  res.render('home.hbs',{
    welcomeMesage:'Welcome',
    pageTitle:'Home Page',
    });
});

app.get('/about',(req,res)  =>{
  res.render('about.hbs',{
    pageTitle:'About Page',

  });
});

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage:'Unable to load the page'
  })
});
app.listen(port,()=>{
  console.log(`Server is up on Port ${port}`);
});
