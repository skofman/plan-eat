var app = angular.module('planeat');

app.directive('homebar', homebar);

function homebar() {
  return {
    templateUrl: 'home/homebar.directive.html'
  }
}
