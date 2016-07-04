var express = require('express');
var router = express.Router();

var Property = require('../models/property');

router
  .post('/', (req,res) => {
    var property = new Property(req.body);
    property.save((err, saved) => {
      res.status(err ? 400 : 200).send(err || saved);
    })
  })
  .get('/', (req,res) => {
    var select = req.query.select;
    Property
    .find({})
    .populate('tenants')
    .select(select)
    .exec((err, props) => {
      res.status(err ? 400 : 200).send(err || props);
    })
  })
  .get('/:id', (req, res) => {
    Property.findById(req.params.id, function(err, prop) {
      res.status(err ? 400 : 200).send(err || prop);
    }).populate('tenants');
  })
  .put('/:id', (req,res) => {
    Property.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true}, (err, prop) => {
      res.status(err ? 400 : 200).send(err || prop);
    })
  })
  .delete('/:id', (req,res) => {
    Property.findByIdAndRemove(req.params.id, err => {
      res.status(err ? 400 : 200).end();
    })
  })
  .get('/selects', (req,res) => {
    var select1 = req.query.select1;
    var select2 = req.query.select2;
    Property
    .find({})
    .select(select1 + ' ' + select2 + " -_id")
    .exec((err, props) => {
      res.status(err ? 400 : 200).send(err || props);
    })
  })
  .get('/find', (req,res) => {
    Property
    .find(req.query)
    .exec((err, props) => {
      res.status(err ? 400 : 200).send(err || props);
    })
  })
  .post('/:id/client/:clientId', (req, res) => {
    var propId = req.params.id;
    var clientId = req.params.clientId;
    Property.addTenant(propId, clientId, (err, newTenant) => {
      res.status(err ? 400 : 200).send(err || newTenant);
    })
  })
  .delete('/:id/client/:clientId', (req, res) => {
    var propId = req.params.id;
    var clientId = req.params.clientId;
    Property.removeTenant(propId, clientId, err => {
      res.status(err ? 400 : 200).send(err);
    })
  })



module.exports = router;

