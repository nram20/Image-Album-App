'use strict';

var app = angular.module('propApp');

app.service('Property', function($http) {

  this.getAll = () => $http.get('api/properties');

  this.postProp = (prop) => $http.post('api/properties', prop);

  this.getNums = () => $http.get(`api/properties/?select=aptNum`);

  this.findById = (id) => $http.get(`api/properties/${id}`);

  this.putEdit = (id, prop) => $http.put(`api/properties/${id}`, prop);

  this.deleteProp = (id) => $http.delete(`api/properties/${id}`);

  this.getBedAndBath = () => $http.get('api/properties/selects/?select1=bathroom&select2=bedroom')

  this.sortByBedAndBath = (bed, bath) => $http.get(`api/properties/find/?bathroom=${bath}&bedroom=${bed}`)
//someissue?
  this.postTenant = (propId, clientId) => $http.post(`api/properties/${propId}/client/${clientId}`);

  this.removeTenant = (propId, clientId) => $http.delete(`api/properties/${propId}/client/${clientId}`);
});

app.service('Clients', function($http) {

  this.getAll = () => $http.get('api/clients');

  this.postClient = (client) => $http.post('api/clients', client);

  this.putEdit = (id, client) => $http.put(`api/clients/${id}`, client);

  this.deleteClient = (id) =>  $http.delete(`api/clients/${id}`);

//Some issue?
  this.getPotential = (id) => $http.get(`api/clients/potential/${id}`);

  this.getById = (id) => {
    return $http.get(`api/clients/${id}`)
    .then(res => res.data);
  }
})
