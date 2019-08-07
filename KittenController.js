const Kitten = require("./Kitten");

const kittenController = {};

// Show list of kittens
kittenController.list = (req, res) => {
  // Kitten is a Mongoose Model, which has query methods like `.find()`
  Kitten.find({}).exec( (err, kittens) => {
    // Query method responds with optional error and the documents it found
    if (err) {
      console.log("Error:", err);
      // sendStatus is an Express method from the `res` api
      res.sendStatus(404)
    }
    else {
      // res.json is an express method
      res.json(kittens)
    }
  });
};

kittenController.create = (req, res) => {
  // req.body is the data coming in from the request, parsed through the bodyParser middleware
  // new Kitten creates new instance of our Kitten model, which is a Mongoose model/ object
  let newKitten = new Kitten(req.body)
  // call save on the kitten instance, which is a 
  newKitten.save()
  res.json(newKitten)
}

kittenController.show = (req, res) => {
  let id = req.params.id
  Kitten.findById(id).exec( (err, kitten) => {
    if (err) {
      console.log("Error:", err);
      res.sendStatus(404)
    }
    else {
      res.json(kitten)
    }
  });

}


kittenController.delete = (req, res) => {
  let id = req.params.id
  Kitten.findByIdAndRemove(id).exec( (err, kitten) => {
    if (err) {
      console.log("Error:", err);
      res.sendStatus(404)
    }
    else {
      res.sendStatus(200)
    }
  });
}


kittenController.edit = (req, res) => {
  let id = req.params.id
  Kitten.findByIdAndUpdate(id, req.body, { new: true }).exec( (err, kitten) => {
    if (err) {
      console.log("Error:", err);
      res.sendStatus(404)
    }
    else {
      res.json(kitten)
    }
  });
}

module.exports = kittenController;