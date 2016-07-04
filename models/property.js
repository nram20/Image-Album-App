

var mongoose = require('mongoose');
var Clients = require('./clients');

var propertySchema = new mongoose.Schema({
  aptNum: {type: String},
  imageUrl:{type: String, required: true},


  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clients' }]
});


propertySchema.statics.addTenant = function(propId, clientId, cb) {
  Property.findById(propId, (err1, prop) => {
    Clients.findById(clientId, (err2, client) => {
      if(err1 || err2) return cb(err1 || err2);
      var clientLivesAtProp = prop.tenants.indexOf(client._id) !== -1;
      if(clientLivesAtProp) {
        return cb({error: "They already live there"})
      };


      // if(client.apt.length !== []) {
      //   Property.removeTenant(client.apt[0], client._id, err => {
      //     if(err) return cb(err);
      //   })
      // }
      client.apt;
      client.apt.push(prop._id);
      prop.tenants.push(client._id);
  
      prop.save(err1 => {
        client.save(err2 => {
          cb(err1 || err2, client);
        })
      })
    })
  })
}

propertySchema.statics.removeTenant = function(propId, clientId, cb){
  Property.findById(propId, (err, prop) => {
    if(err) return cb(err);
    prop.tenants = prop.tenants.filter(tenantId => {
      return tenantId.toString() != clientId
    })

    prop.save(err => {
      cb(err);
    });
  });
};

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;