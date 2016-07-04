'use strict';

var app = angular.module('propApp');

app.controller('propCtrl', function($scope, Property) {
  $scope.form = 0;
  $scope.editForm = 0;
  $scope.BandB = [];
  Property.getAll()
  .then(props => {
    $scope.props = props.data;
  })
  // Property.getBedAndBath()
  // .then(props => {
  //   $scope.BandB = props.data;
  // })
  // .catch(err => {
  //   console.log(err);
  // })

  $scope.showForm = () => {
    if($scope.form === 0){
      $scope.editForm = 0;
      $scope.form = 1;
    } else {
      $scope.form = 0;
    }
  }

  $scope.postNew = () => {
    console.log($scope.new);
    Property.postProp($scope.new)
    .then(prop => {
      $scope.form = 0;
      $scope.new = {};
      $scope.props.push(prop.data);
      // return Property.getBedAndBath()
    })
    // .then(props => {
    //   $scope.BandB = props.data;
    // })
    .catch(err => {
      console.log(err);
    })
  }

  $scope.editProp = (prop) => {
    $scope.form = 0;
    $scope.editForm = 1;
    var copy = angular.copy(prop)
    $scope.edit = copy;
  }

  $scope.postEdit = (id) => {
    Property.putEdit(id, $scope.edit)
    .then(prop => {
      $scope.editForm = 0;
      $scope.edit = {};
      for(var i = 0; i < $scope.props.length; i++){
        if($scope.props[i]._id === prop.data._id){
          $scope.props[i] = prop.data;
        }
      }
      // return Property.getBedAndBath()
    })
    .then(props => {
      $scope.BandB = props.data;
    })
    .catch(err => {
      console.log(err);
    })
  }

  $scope.deleteProp = (id) => {
    Property.deleteProp(id)
    .then(() => {
      for(var i = 0; i < $scope.props.length; i++){
        if($scope.props[i]._id == $scope.edit._id){
          $scope.editForm = 0;
          $scope.edit = {};
          return $scope.props.splice(i, 1);
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  $scope.sortBy = (bed, bath) => {
    Property.sortByBedAndBath(bed, bath)
    .then(props => {
      $scope.props = props.data;
    })
  }

  $scope.unSort = () => {
    Property.getAll()
    .then(props => {
      $scope.props = props.data;
    })
  }
})

app.controller('clientCtrl', function($scope, Clients, Property){
  $scope.form = 0;
  $scope.editForm = 0;
  Clients.getAll()
  .then(clients => {
    $scope.clients = clients.data;
    console.log($scope.clients);
  })
  .catch(err => {
    console.log(err);
  })

  Property.getNums()
  .then(nums => {
    $scope.numbers = nums.data;
  })
  .catch( err => {
    console.log(err);
  })

  $scope.showForm = () => {
    if($scope.form === 0){
      $scope.editForm = 0;
      $scope.form = 1;
    } else {
      $scope.form = 0;
    }
  }


  $scope.postNew = () => {
    var newClient = $scope.new;
    Clients.postClient($scope.new)
    .then(client => {
      $scope.form = 0;
      $scope.new = {};
      $scope.clients.push(client.data);
      return Property.postTenant(client.data.apt[0], client.data._id);
    })
    .then(() => {
      return Property.findById(newClient.apt)
    })
    .then(prop => {
      $scope.clients[$scope.clients.length - 1].apt[0] = prop.data;
    })
    .catch(err => {
      console.log(err);
    })
  }

  $scope.editClient = (client) => {
    $scope.form = 0;
    $scope.editForm = 1;
    var copy = angular.copy(client)
    $scope.nameCopy = angular.copy(client.name);
    $scope.edit = copy;
  }

  $scope.postEdit = (id, apt) => {
    $scope.edit.apt = apt._id;
    Clients.putEdit(id, $scope.edit)
    .then(client => {
      for(var i = 0; i < $scope.clients.length; i++){
        if($scope.clients[i]._id === client.data._id){
          $scope.nameCopy = '';
          $scope.edit = {};
          $scope.editForm = 0;
          $scope.clients[i] = client.data;
        }
      }
     })
    .catch(err => {
      console.log(err);
    })
  }

  $scope.deleteClient = (id) => {
    Clients.deleteClient(id)
    .then(() => {
      for(var i = 0; i < $scope.clients.length; i++){
        if($scope.clients[i]._id === id){
          return $scope.clients.splice(i, 1);
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

})

app.controller('propDetailCtrl', function($scope, Property, $stateParams, Clients) {
  $scope.showForm = 0;
  Property.findById($stateParams.id)
  .then(res => {

    console.log('res.data:', res.data);
    $scope.prop = res.data;
    return Clients.getPotential(res.data._id);
  })
  .then(clients => {
    $scope.potential = clients.data;
  })
  .catch(err => {
    console.log(err);
  });

  $scope.openForm = () => {
    $scope.showForm = 1;
  }
// issue with save tenant
  $scope.saveTenant = () => {
    console.log($scope)
    // var tenantId = $scope.client._id;
    var tenantId = $scope.selectedTenantId;
    var propId = $scope.prop._id;
    Property.postTenant(propId, tenantId)
    .then(tenant => {
      $scope.showForm = 0;
      $scope.prop.tenants.push(tenant.data);
      return Clients.getPotential($scope.prop._id);
    })
    .then(clients => {
      $scope.potential = clients.data;
    })
    .catch((err) => {
      console.log(err);
    })
  }
})

app.controller('clientDetailCtrl', function($scope, $stateParams, Clients){

  Clients.getById($stateParams.id)
  .then(client => {
    $scope.client = client;
    console.log($scope.client);
  })
})
