const express = require('express')
const app = express()
const port = 3001

// Page with all universities
app.get('/universities', function (req, res) {
  res.send('All Universities');
})

// Page with University details
app.get('/university/:id', function (req, res) {
  res.send('University Page');
})

// Page with Department details
app.get('/department/:id', function (req, res) {
  res.send('Department Page');
})

// Page with Course Details
app.get('/course/:id', function (req, res) {
  res.send('Course Page');
})

// Page with Textbook Details
app.get('/textbook/:id', function (req, res) {
  res.send('Textbook Page');
})

// Page with all orders
app.get('/orders', function (req, res) {
  res.send('All Orders');
})

// Make an order for textbook
app.post('/order', function (req, res){
  res.send('Make an Order');
})

// Edit an order for textbook
app.put('/order/:id', function (req, res){
  res.send('Edit an order');
})

// Delete an order for textbook
app.delete('/order/:id', function (req, res){
  res.send('Delete an order');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
