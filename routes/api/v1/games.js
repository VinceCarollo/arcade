var express = require("express");
var router = express.Router();
var Game = require('../../../models').Game;

router.get("/", function(req, res, next){
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.get("/:id", function(req, res, next){
  Game.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(game));
    })
    .catch(error =>{
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    })
});

router.post("/", function(req, res, next) {
  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

router.patch("/:id", function(req, res, next) {
  Game.update({
    title: req.body.title,
    price: req.body.price,
    releaseYear: req.body.releaseYear,
    active: req.body.active
  },
  {
    returning: true,
    where: {
      id: req.params.id
    }
  })
  .then(([rowsUpdate, [updatedGame]]) => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(updatedGame));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  })
})

router.delete("/:id", function(req, res, next) {
  Game.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(rowDeleted => {
    if (rowDeleted === 1) {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify('Successfully Deleted'));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send(JSON.stringify('Resource Unsuccessfully Deleted'));
    }
  })
})

module.exports = router;
