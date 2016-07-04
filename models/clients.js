'use strict';

var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  apt:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

var Clients = mongoose.model('Clients', clientSchema);

module.exports = Clients;
