var app = angular.module('planeat', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.view.html',
    controller: 'loginController',
    controllerAs: 'login'
  })
  .when('/signup', {
    templateUrl: 'login/signup.view.html',
    controller: 'loginController',
    controllerAs: 'login'
  })
}]);
