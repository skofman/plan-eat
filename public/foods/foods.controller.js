var app = angular.module('planeat');

app.controller('foodsController', foods);

app.$inject = ['$http'];

function foods($http) {
  var vm = this;

  vm.search = "";
  vm.found = false;

  vm.searchFoods = function() {
    var foods = $http.post('http://localhost:3000/searchfoods', {search: vm.search});
    foods.then(function(data) {
      vm.results = JSON.parse(data.data);
      vm.found = true;
      console.log(vm.results);
    })
  }

  vm.getItem = function(id) {
    
  }
}
