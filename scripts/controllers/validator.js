'use strict';

/**
 * @ngdoc function
 * @name vagrantApp.controller:ValidatorsCtrl
 * @description
 * # AboutCtrl
 * Controller of the validators.ripple
 */
angular.module('validatorsApp')
  .controller('ValidatorCtrl', [
    '$scope',
    '$routeParams',
    'Validators',
    'ValidatorHistoryService', function ($scope, $routeParams, Validators, ValidatorHistoryService) {

    $scope.loading = true;
    $scope.reports = []

    ValidatorHistoryService.fetch($routeParams.publicKey).then(function(reports) {
      $scope.loading = false
      $scope.reports = reports
      $scope.$apply()
    })
    .catch(function(error) {
      $scope.loading = false;
      alert('error loading validation history for', $routeParams.publicKey);
    });

    $scope.validatorPublicKey = $routeParams.publicKey;

    Validators.getValidators().then(function(validators) {
      $scope.domain = Validators.getDomain($routeParams.publicKey)
    })
  }]);
