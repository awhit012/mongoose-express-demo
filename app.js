// import express library
const express = require('express')
const app = express()

// import mongoose library
const mongoose = require('mongoose');
// import bodyparser, morgan, & kittenController
const bodyParser = require('body-parser')
const morgan = require('morgan')

const KittenController = require('./KittenController')
// app is the express app
// tell it to use bodyParser middleware, and to expect JSON in the body
app.use(morgan("tiny"))
app.use(bodyParser.json())

// app.METHOD() is functionality from Express
app.get('/kittens', (req, res) => {
  // custom vanilla JS
  KittenController.list(req, res)
})

app.post('/kittens', (req, res) => {
  KittenController.create(req, res)
})

app.get('/kittens/:id', (req, res) => {
  KittenController.show(req, res)
})

app.delete('/kittens/:id', (req, res) => {
  KittenController.delete(req, res)
})

app.put('/kittens/:id', (req, res) => {
  KittenController.edit(req, res)
}) 

// listen on port, this is Express syntax, but almost the same thing as using the node http module
const server = app.listen(8080, ()=>{
  console.log('Node server created at port 8080');
});

// this connects our local mongoose object to our mongo process running in the terminal using `mongod`
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('connected to mongodb')
});