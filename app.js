var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log('yay')
});

function Kittens(){
  this.kittySchema = mongoose.Schema({
    name: String
  })
  this.Kitten = mongoose.model('Kitten', this.kittySchema);
  this.allKittens = [];
  this.allKittens.push( new this.Kitten({ name: 'Silence' }));
  this.allKittens.push(new this.Kitten({ name: 'fluffy' }));
  this.saveAll = function(){
  	this.allKittens.forEach(cat, function(){
  		cat.save(function(err){
  			if (err) return handleError(err);
			console.log('saved')
  		});
  	});
  };

  this.Kitten.find({}, function(err, kitten){
  	console.log(kitten)
  });

}
k = new Kittens;

k.save;

