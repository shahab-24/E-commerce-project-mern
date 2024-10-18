const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('welcome to the server')
})
app.get('/products', (req, res) => {
  res.status(200).send({
    message: 'products are returned'
  })
})

app.listen(3001, ()=>{
  console.log(`server is running on port at 3001`);
})