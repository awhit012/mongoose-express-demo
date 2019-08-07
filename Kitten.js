var mongoose = require('mongoose');

var KittenSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Kitten', KittenSchema);