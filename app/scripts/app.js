'use strict';

/**
 * @ngdoc overview
 * @name opendoorApp
 * @description
 * # opendoorApp
 *
 * Main module of the application.
 */
angular
.module('opendoorApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
