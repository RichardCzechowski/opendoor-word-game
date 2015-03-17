angular.module('opendoorApp')
.directive('letterPanel', [ function () {
  return {
    template: '<div class="letterPanel" ng-class=info ng-model="letter">{{letter}}</div>',
    restrict: 'E'
  };
}]);
