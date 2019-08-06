const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('yay')
});

class Kittens {
  constructor() {
    // mongoose gives us a Schema function allowing us to define our documents
    this.kittySchema = mongoose.Schema({
      name: String
    })
    // models get a capital letter by convention. 
    // we create a model passing it a name and a Schema
    // by convention the name passed in is the same as the variable name
    this.Kitten = mongoose.model('Kitten', this.kittySchema);
    this.allKittens = [];
    this.allKittens.push( new this.Kitten({ name: 'Silence' }));
    this.allKittens.push(new this.Kitten({ name: 'fluffy' }));
  }
  
  
  saveAll() {
  	this.allKittens.forEach( (cat) =>{
  		cat.save((err) => {
  			if (err) return handleError(err);
			console.log('saved')
  		});
  	});
  };

  find() {
    this.Kitten.find({}, (err, kitten) => {
      console.log(kitten)
    })
  }
}

k = new Kittens();

k.saveAll();

k.find()

