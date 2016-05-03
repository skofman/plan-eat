var app = angular.module('planeat');

app.controller('inventoryController', inventory);

app.$inject = ['$http'];

function inventory($http) {
  var vm = this;

  vm.populateCustom = function() {
    var custom = $http.get('/getfoods?type=food&origin=custom');
    custom.then(function(data) {
      vm.customItems = data.data;
    })
  }
  vm.populateCustom();

  vm.populateSaved = function() {
    var saved = $http.get('/getfoods?type=food&origin=api');
    saved.then(function(data) {
      vm.savedItems = data.data;
    })
  }
  vm.populateSaved();

  vm.populateInventory = function() {
    var getItems = $http.get('/getinventory');
    getItems.then(function(data) {
      vm.items = data.data;
    })
  }
  vm.populateInventory();

  vm.addSaved = function(item) {
    item.qty = 1;
    var addItem = $http.post('/addinventory', item);
    addItem.then(function(data) {
      vm.populateInventory();
    })
  }

  vm.updateInventory = function() {
    var update = $http.put('/updateinventory', vm.item);
    update.then(function(data) {
      vm.populateInventory();
    })
  }
}
