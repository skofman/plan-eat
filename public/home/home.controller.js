var app = angular.module('planeat');

app.controller('homeController', home);

app.$inject = ['$http', '$window'];

function home($http, $window) {
  var vm = this;

  vm.logout = function() {
    var logout = $http.get('/logout');
    logout.then(function(data) {
      $window.location.href = '/';
      vm.loggedin = false;
    })
  }

  vm.active = 'home';
  vm.calTarget = 0;
  vm.protTarget = 0;
  vm.fatTarget = 0;
  vm.carbTarget = 0;
  vm.protGrams = 0;
  vm.fatGrams = 0;
  vm.carbGrams = 0;
  vm.totalTarget = false;

  vm.gethome = function() {
    var get = $http.get('/gethome');
    get.then(function(data) {
      vm.plan = data.data;
      vm.calories = 0;
      vm.protein = 0;
      vm.carbs = 0;
      vm.fat = 0;
      vm.goals = vm.plan.goals;
      for (var i = 0; i < vm.plan.items.length; i++) {
        vm.calories += vm.plan.items[i].nf_calories * vm.plan.items[i].qty;
        vm.protein += vm.plan.items[i].nf_protein * vm.plan.items[i].qty;
        vm.carbs += vm.plan.items[i].nf_total_carbohydrate * vm.plan.items[i].qty;
        vm.fat += vm.plan.items[i].nf_total_fat * vm.plan.items[i].qty;
      }
    })
  }
  vm.gethome();

  vm.calcTargets = function() {
    vm.protGrams = Math.round(vm.calTarget * vm.protTarget/ (100 * 4));
    vm.fatGrams = Math.round(vm.calTarget * vm.fatTarget / (100 * 9));
    vm.carbGrams = Math.round(vm.calTarget * vm.fatTarget / (100 * 4));
    if (vm.protTarget + vm.fatTarget + vm.carbTarget === 100) {
      vm.totalTarget = true;
    }
    else {
      vm.totalTarget = false;
    }
  }

  vm.updateTargets = function() {
    var goals = {};
    goals.calories = vm.calTarget;
    goals.protein = vm.protGrams;
    goals.fat = vm.fatGrams;
    goals.carbs = vm.carbGrams;
    var setGoals = $http.put('/gethome', goals);
    setGoals.then(function(data) {
      vm.goals = data.data;
    })
  }
}
