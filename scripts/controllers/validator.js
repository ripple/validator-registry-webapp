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
    'ValidatorHistoryService', function ($scope, $routeParams, ValidatorHistoryService) {

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

    var validators = {
      "n943hviZ4nZhj3qdN4FqeVMK6JvHE4rcPtExiLebKZXui6oAyUr4": "coinex gateway",
      "n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7": "RL1",
      "n94p5CKJzgf9PnzZV88QcKCRE1tzpAzAaG2RSSS4KYQstyGsFfoJ": "xrptalk/lyxoo?",
      "n9JZyuiE8G3NabSceWEXg8Uh55dPDV7RTo451UmWey2g2PZZ5q7x": "wisepass",
      "n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS": "RL4",
      "n9L5CCrfKjxnBXwXNcZETeMZoNxuNDJyUWwdXPdsgEses6rGgZc1": "senderas",
      "n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C": "RL3",
      "n9LAWeFCQkbmkzXNwmueG7JcczCcQ3Ap5KwEPEL53L31fdVttBir": "universal trade exchange",
      "n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA": "RL5",
      "n9LigbVAi4UeTtKGHHTXNcpBXwBPdVKVTjbSkLmgJvTn6qKB8Mqz": "snapswap",
      "n9LkdtxJAARSYrogcdJPtdtC4cbrzQd8RyiztLXua1WiK46CqZGN": "ripplecn",
      "n9M4zddPGGbY7Rfdfo5GV7S9UVGPLC9n8PubEjzo6tLcJe6zSMg3": "torrie's demo validator",
      "n9MA8h41yQRkXDnSSCRuCptzdzosv4cxkFBpjf4EyCfughqqaK51": "rippleru",
      "n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj": "RL2",
      "n9MG8aiQxrupaCnkvTdLeEN6XGsedSdLd8NnVE9RgfaanPvrspL7": "bitstamp",
      "n9MLVGTjHcKaUComy5ogfd1dZjzuQhqrTMNuefQZmcUPzCj21tX3": "wisepass",
      "n9Mb8ZiVL6bepu2QbSTbPMNVJp4TUj2cRq4qY7A9EMyAdRaKiCnD": "the rock trading"
    };
    */

    $scope.validatorPublicKey = $routeParams.publicKey;
  }]);
