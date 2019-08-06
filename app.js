const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const KittenController = require('./KittenController')

app.use(bodyParser.json())

app.get('/kittens', (req, res) => {
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

const server = app.listen(8080, ()=>{
  console.log('Node server created at port 8080');
});


mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('yay')
});