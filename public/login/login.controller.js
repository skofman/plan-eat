var app = angular.module('planeat');

app.controller('loginController', login);

app.$inject = ['$http', '$window'];

function login($http, $window) {
  var vm = this;

  vm.error = false;
  vm.msg = "";

  vm.checkuser = function() {
    var user = $http.post('http://localhost:8080/checkuser', {user: vm.user, pwd: vm.pwd});
    user.then(function(data) {
      if (data.status === 200) {
        vm.error = false;
        vm.signup();
      }
      else {
        vm.error = true;
        vm.msg = 'Username is taken. Please choose a different one.';
        vm.user = "";
        vm.pwd = "";
      }
    })
  };

  vm.signup = function() {
    if (vm.user.length < 3) {
      vm.error = true;
      vm.msg = 'Username shall be at least 3 characters long';
      return;
    }
    if (vm.pwd.length < 3) {
      vm.error = true;
      vm.msg = 'Password shall be at least 3 characters long';
      return;
    }
    var user = $http.post('http://localhost:8080/signup', {user: vm.user, pwd: vm.pwd});
    user.then(function(data) {
      if (data.status === 201) {
        vm.error = false;
        vm.login();
      }
      else {
        vm.error = true;
        vm.msg = 'Operation failed. Please try again.';
      }
    })
  }

  vm.login = function() {
    var user = $http.post('http://localhost:8080/login', {user: vm.user, pwd: vm.pwd});
    user.then(function(data) {
      vm.user = "";
      vm.pwd = "";
      if (data.status === 200) {
        vm.error = false;
        $window.location.href = '#/home';
      }
      else {
        vm.error = true;
        vm.msg = 'Wrong login information';
      }
    })
  }
}
