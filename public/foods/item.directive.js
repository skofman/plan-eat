var app = angular.module('planeat');

app.directive('item', item);

function item() {
  return {
    templateUrl: 'foods/item.directive.html'
  }
}
