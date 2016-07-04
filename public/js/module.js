'use strict';

var app = angular.module('propApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('prop', {
    url: '/',
    templateUrl: 'html/properties.html',
    controller: 'propCtrl'
  })
  .state('clients', {
    url: '/clients',
    templateUrl: 'html/clients.html',
    controller: 'clientCtrl'
  })
  .state('propertyDetail', {
    url: '/propDetail/:id',
    templateUrl: 'html/propertyDetail.html',
    controller: 'propDetailCtrl'
  })
  .state('clientDetail', {
    url: '/client/:id',
    templateUrl: 'html/clientDetail.html',
    controller: 'clientDetailCtrl'
  })
  $urlRouterProvider.otherwise('/');
});
