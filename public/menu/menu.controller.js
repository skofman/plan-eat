var app = angular.module('planeat');

app.controller('menuController', menu);

app.$inject = ['$http'];

function menu($http) {
  var vm = this;

  vm.loggedin = false;
}
