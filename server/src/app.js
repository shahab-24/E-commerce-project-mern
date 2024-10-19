const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const createError = require('http-errors')
const rateLimit = require('express-rate-limit')
const app = express();


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: 'too many request form this IP, Please try again later'
})


// middleweare===========

app.use(morgan('dev'))
app.use(limiter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// const isLoggedIn = (req, res, next) => {
//   const login = true;
//   if(login){
//     req.body.id = 101
//     next()
//   }else{
//     res.status(401).json({message :"unauthorized user, please login first"})
//   }
// }


app.get('/',limiter, (req, res) => {
  res.send('welcome to the server')
});

app.get('/api/user', (req, res) => {
  // console.log(req.body.id);
  res.status(200).send({
    message: 'user profile is returned'
  })
});

// client error handling=>=>=>

  
  app.use((req,res,next)=> {

    
   
   next(createError(404, "route not found") )
  });


  // server error handling--=====
  app.use((err,req,res,next)=> {
   
   return res.status( err.status || 500).json({
    success: false,
    message: err.message
   })
  })

  module.exports = app;
  
