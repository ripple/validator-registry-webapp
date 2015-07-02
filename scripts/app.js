'use strict';

/**
 * @ngdoc overview
 * @name validatorsApp
 * @description
 * # validatorsApp
 *
 * Main module of the application.
 */
angular
  .module('validatorsApp', [
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
        redirectTo: '/validators'
      })
      .when('/validators/:publicKey', {
        templateUrl: 'views/validator.html',
        controller: 'ValidatorCtrl'
      })
      .when('/validators', {
        templateUrl: 'views/validators.html',
        controller: 'ValidatorsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
