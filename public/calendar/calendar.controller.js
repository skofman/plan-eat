var app = angular.module('planeat');

app.controller('calendarController', calendar);

app.$inject = ['$http'];

function calendar($http) {
  var vm = this;

  vm.increment = 0;

  vm.getDate = function() {
    var url = 'http://localhost:3000/getdate/' + vm.increment;
    var date = $http.get(url);
    date.then(function(data) {
      vm.week = data.data.week;
      vm.dates = data.data.start + ' - ' + data.data.end;
    })
  }
  vm.getDate();

  vm.nextWeek = function() {
    vm.increment++;
  }

  vm.prevWeek = function() {
    vm.increment--;
  }

  vm.currentWeek = function() {
    vm.increment = 0;
  }
}
