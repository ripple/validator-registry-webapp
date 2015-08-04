'use strict';

/**
 * @ngdoc function
 * @name vagrantApp.controller:ValidatorsCtrl
 * @description
 * # AboutCtrl
 * Controller of the validators.ripple
 */

angular.module('validatorsApp')
  .controller('ValidatorsCtrl', [
    '$scope',
    '$http',
    'ValidatorsSelectorService',
    'ValidatorsLoader',
    'UNLBuilder', function ($scope, $http, ValidatorSelector, ValidatorsLoader, UNLBuilder) {

    $scope.buildUNL = function() {
      var validators = ValidatorSelector.getSelectedValidators()
      var quorum = ValidatorSelector.getQuorum()

      return UNLBuilder.buildUNL(validators, quorum)
    }

    // ValidatorSelector
    $scope.ValidatorSelector = ValidatorSelector

    $scope.toggleSelected = function(validator) {
      ValidatorSelector.toggleSelection(validator)
    }

    $scope.loading = true
    $scope.status = "Loading Validators..."

    ValidatorsLoader.scan($scope)
  }]);

