var app = angular.module('planeat');

app.controller('inventoryController', inventory);

app.$inject = ['$http'];

function inventory($http) {
  var vm = this;

  vm.add = [];
  vm.upc = "";
  vm.scanned = [];

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

  vm.searchFoods = function() {
    var foods = $http.post('/searchfoods', {search: vm.searchItem});
    foods.then(function(data) {
      var obj = JSON.parse(data.data);
      for (var i = 0; i < 20; i++) {
        vm.add[i] = obj.hits[i].fields;
      }
    })
  }

  vm.addItem = function(item) {
    item.qty = vm.servings;
    item.type = "food";
    item.origin = "api";
    var add = $http.post('/additem', item);
    add.then(function(data) {
      vm.populateSaved();
    })
    var inv = $http.post('/addinventory', item);
    inv.then(function(data) {
      vm.populateInventory();
    })
    vm.servings = 1;
  }

  vm.findUPC = function() {
    var upc = $http.post('/findupc', {upc: vm.upc});
    upc.then(function(data) {
      var item = JSON.parse(data.data);
      item.qty = 1;
      vm.scanned.push(item);
      vm.upc = "";
    })
  }

  vm.addScanned = function() {
    var inv = $http.post('/addinventory/scanned', vm.scanned);
    inv.then(function(data) {
      vm.populateInventory();
    })
  }
}
