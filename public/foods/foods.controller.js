var app = angular.module('planeat');

app.controller('foodsController', foods);

app.$inject = ['$http', '$window'];

function foods($http, $window) {
  var vm = this;

  vm.search = "";
  vm.found = false;
  vm.customItem = {};

  vm.searchFoods = function() {
    var foods = $http.post('http://localhost:3000/searchfoods', {search: vm.search});
    foods.then(function(data) {
      vm.results = JSON.parse(data.data);
      console.log(vm.results);
    })
  }

  vm.getItem = function(id) {
    var item = $http.post('http://localhost:3000/getitem', {id: id});
    item.then(function(data) {
      vm.item = data.data;
      vm.found = true;
      calcPercentages();
    })
  }

  function calcPercentages() {
    vm.item.fatdv = Math.round(100 * vm.item.nf_total_fat / 65);
    vm.item.satfatdv = Math.round(100 * vm.item.nf_saturated_fat / 20);
    vm.item.transfatdv = Math.round(100 * vm.item.nf_trans_fatty_acid / 20);
    vm.item.choldv = Math.round(100 * vm.item.nf_cholesterol / 300);
    vm.item.sodiumdv = Math.round(100 * vm.item.nf_sodium / 2400);
    vm.item.carbdv = Math.round(100 * vm.item.nf_total_carbohydrate / 300);
    vm.item.fiberdv = Math.round(100 * vm.item.nf_dietary_fiber / 25);
    vm.item.cals = 9 * vm.item.nf_total_fat + 4 * (vm.item.nf_total_carbohydrate + vm.item.nf_protein);
    vm.item.fatpct = Math.round(100 * vm.item.nf_total_fat * 9 / vm.item.cals);
    vm.item.carbpct = Math.round(100 * vm.item.nf_total_carbohydrate * 4 / vm.item.cals);
    vm.item.protpct = Math.round(100 * vm.item.nf_protein * 4 / vm.item.cals);
  }

  vm.addCustom = function() {
    var item = $http.post('http://localhost:3000/addcustom', vm.customItem);
    item.then(function(data) {
      vm.item = data.data;
      vm.found = true;
      calcPercentages();
    })
  }
}
