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

    var response = jQuery.ajax({
      type: 'GET',
      url: '/config/config.json',
      cache: false,
      async: false,
      contentType: 'application/json',
      dataType: 'json'
    });

    if (response.status === 200) {
       window.config = angular.fromJson(response.responseText);
    } else {
      alert('error loading configuration')
    }

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

