'use strict';

/**
 * @ngdoc function
 * @name vagrantApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vagrantApp
 */
angular.module('vagrantApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
