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

    // load clipboard flash plugin
    (function () {
      var client = new ZeroClipboard( document.getElementById("copy-button") );

      client.on( "ready", function( readyEvent ) {
        client.on( "aftercopy", function( event ) {
          event.target.style.display = "none";
          alert("Copied text to clipboard: \n" + event.data["text/plain"] );
          $('#copy-button').show()
        } );
      });
    })()


    $scope.loading = true;
    $scope.status = "Loading Validators..."

    $scope.unl_text = ''
      + '[validators]\n'
      + 'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7 ripple.com\n'
      + 'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj ripple.com\n'
      + 'n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C ripple.com\n'
      + 'n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS ripple.com\n'
      + 'n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA ripple.com\n';

    // load validators from registry api
    (function() {
      $http({
        url: VALIDATOR_REGISTRY_API+"/validators",
        method: "GET"
      }).success(function(data, status, headers, config) {
          console.log('success')
          $scope.loading = false
          $scope.validators = data.validators;
      }).error(function(data, status, headers, config) {
          console.log('error!!', data)
          $scope.loading = true;
          $scope.status = "Error Connecting to Validator Registry API";
      });
    })()
  });

