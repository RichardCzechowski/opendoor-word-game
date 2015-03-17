angular.module('opendoorApp')
.directive('timer', [ function () {
  return {
    template: '<div class="letterPanel" ng-class=info ng-model="letter">{{letter}}</div>',
    restrict: 'E'
  };
}]);
