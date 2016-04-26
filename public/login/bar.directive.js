var app = angular.module('planeat');

app.directive('bar', bar);

function bar() {
  return {
    templateUrl: 'login/bar.directive.html'
  }
}
