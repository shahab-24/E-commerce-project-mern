const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();


// middleweare===========

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const isLoggedIn = (req, res, next) => {
  const login = true;
  if(login){
    req.body.id = 101
    next()
  }else{
    res.status(401).json({message :"unauthorized user, please login first"})
  }
}


app.get('/', (req, res) => {
  res.send('welcome to the server')
})

app.get('/api/user', isLoggedIn, (req, res) => {
  // console.log(req.body.id);
  res.status(200).send({
    message: 'user profile is returned'
  })
})

// client error handling=>=>=>

  
  app.use((req,res,next)=> {
    res.status(404).json({message: "route not found"})
    next()
  })


  // server error handling--=====
  app.use((err,req,res,next)=> {
    console.error(err.stack);
    res.status(500).send("something wrong")
  })
  

app.listen(3001, ()=>{
  console.log(`server is running on port at 3001`);
})