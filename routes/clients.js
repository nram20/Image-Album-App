var express = require('express');
var router = express.Router();

var Clients = require('../models/clients');

router.post('/', (req,res) => {
  var client = new Clients(req.body);
  client.save((err, saved) => {
    res.status(err ? 400 : 200).send(err || saved);
  })
})
  .get('/', (req,res) => {
    Clients
    .find(req.query || {})
    .populate('apt')
    .exec((err, clients) => {
      res.status(err ? 400 : 200).send(err || clients);
    })
  })
  .put('/:id', (req,res) => {
    Clients.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true}, (err, prop) => {
      res.status(err ? 400 : 200).send(err || prop);
    })
  })
  .delete('/:id', (req,res) => {
    Clients.findByIdAndRemove(req.params.id, err => {
      res.status(err ? 400 : 200).end();
    })
  })
  .get('/potential/:id', (req,res) => {
    Clients
    .find({apt: {$ne: req.params.id}})
    .exec((err, clients) => {
      res.status(err ? 400 : 200).send(err || clients);
    })
  })
  .get('/:id', (req,res) => {
    Clients.findById(req.params.id, (err, client) => {
      res.status(err ? 400 : 200).send(err || client);
    }).populate('apt');
  })



module.exports = router;
