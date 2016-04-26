var app = angular.module('planeat');

app.controller('homeController', home);

app.$inject = ['$http', '$window'];

function home($http, $window) {
  var vm = this;

  vm.logout = function() {
    $http.get('http://localhost:8080/logout');
  }
}
