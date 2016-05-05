var app = angular.module('planeat');

app.controller('calendarController', calendar);

app.$inject = ['$http'];

function calendar($http, $window, $document) {
  var vm = this;

  vm.increment = 0;
  vm.selection = "My recipes";
  vm.search = false;
  vm.servings = 1;

  vm.getDate = function() {
    var url = '/getdate/' + vm.increment;
    var date = $http.get(url);
    date.then(function(data) {
      vm.week = data.data.week;
      vm.dates = data.data.start + ' - ' + data.data.end;
      for (key in vm.week) {
        vm.week[key].calories = 0;
        vm.week[key].protein = 0;
        vm.week[key].carbs = 0;
        vm.week[key].fat = 0;
        for (i = 0; i < vm.week[key].items.length; i++) {
          vm.week[key].calories += vm.week[key].items[i].nf_calories * vm.week[key].items[i].qty;
          vm.week[key].protein += vm.week[key].items[i].nf_protein * vm.week[key].items[i].qty;
          vm.week[key].carbs += vm.week[key].items[i].nf_total_carbohydrate * vm.week[key].items[i].qty;
          vm.week[key].fat += vm.week[key].items[i].nf_total_fat * vm.week[key].items[i].qty;
        }
      }
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

  vm.show = function() {
    switch(vm.selection) {
      case "My recipes":
        var recipes = $http.get('/getfoods?type=recipe');
        recipes.then(function(data) {
          vm.add = data.data;
        })
        break;
      case "Custom foods":
        var custom = $http.get('/getfoods?type=food&origin=custom');
        custom.then(function(data) {
          vm.add = data.data;
        })
        break;
      case "Saved foods":
        var saved = $http.get('/getfoods?type=food&origin=api');
        saved.then(function(data) {
          vm.add = data.data;
        })
        break;
      case "Search foods":
        vm.add = [];
        vm.search = true;
        break;
    }
  }
  vm.show();

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
    vm.servings = 1;
    switch(vm.weekday) {
      case 'Sun':
        vm.week.sunday.items.push(item);
        break;
      case 'Mon':
        vm.week.monday.items.push(item);
        break;
      case 'Tue':
        vm.week.tuesday.items.push(item);
        break;
      case 'Wed':
        vm.week.wednesday.items.push(item);
        break;
      case 'Thu':
        vm.week.thursday.items.push(item);
        break;
      case 'Fri':
        vm.week.friday.items.push(item);
        break;
      case 'Sat':
        vm.week.saturday.items.push(item);
        break;
    }
    var url = '/updatecalendar/' + vm.increment;
    var calendarItem = $http.put(url, vm.week);
    calendarItem.then(function(data) {
      vm.getDate();
    })
  }

  vm.shoppingList = function() {
    var shoplist = $http.get('/shoppinglist/' + vm.increment);
    shoplist.then(function(data) {
      vm.list = data.data;
    })
  }
}
