var app = angular.module('planeat');

app.directive('search', search);

function search() {
  return {
    templateUrl: 'foods/search.directive.html'
  }
}
