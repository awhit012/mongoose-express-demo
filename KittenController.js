var mongoose = require("mongoose");
var Kitten = require("./Kitten");

var kittenController = {};

// Show list of kittens
kittenController.list = (req, res) => {
  Kitten.find({}).exec( (err, kittens) => {
    if (err) {
      console.log("Error:", err);
      res.sendStatus(404)
    }
    else {
      res.json(kittens)
    }
  });
};

kittenController.create = (req, res) => {
  let newKitten = new Kitten(req.body)
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