var app = angular.module('planeat', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'login/front.view.html',
    controller: 'loginController',
    controllerAs: 'login'
  })
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
  .when('/home', {
    templateUrl: 'home/home.view.html',
    controller: 'homeController',
    controllerAs: 'home'
  })
  .when('/calendar', {
    templateUrl: 'calendar/calendar.view.html',
    controller: 'calendarController',
    controllerAs: 'calendar'
  })
  .when('/foods', {
    templateUrl: 'foods/foods.view.html',
    controller: 'foodsController',
    controllerAs: 'foods'
  })
  .when('/recipes', {
    templateUrl: 'recipes/recipes.view.html',
    controller: 'recipesController',
    controllerAs: 'recipes'
  })
  .when('/inventory', {
    templateUrl: 'inventory/inventory.view.html',
    controller: 'inventoryController',
    controllerAs: 'inventory'
  })
}])
