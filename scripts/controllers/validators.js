'use strict';

/**
 * @ngdoc function
 * @name vagrantApp.controller:ValidatorsCtrl
 * @description
 * # AboutCtrl
 * Controller of the validators.ripple
 */

var VALIDATOR_REGISTRY_API = "http://127.0.0.1:1337"

angular.module('validatorsApp')
  .controller('ValidatorsCtrl', function ($scope, $http) {

    $scope.loading = true

    $http({
      url: VALIDATOR_REGISTRY_API+"/validators",
      method: "GET"
    }).success(function(data, status, headers, config) {
        $scope.loading = false
        $scope.validators = data.validators;
    }).error(function(data, status, headers, config) {
        $scope.loading = false
        console.log('error', data)
        $scope.status = status;
    });
  });

