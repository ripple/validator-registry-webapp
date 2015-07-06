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

    $scope.selectedValidators = {}

    // ValidatorSelector
    var ValidatorSelector = (function() {
      var selectedValidators = {}

      function isSelected(validator) {
        return selectedValidators[validator.id] ? true : false
      }

      function toggleSelection(validator) {
        if (selectedValidators[validator.id]) {
          delete selectedValidators[validator.id]
        } else {
          selectedValidators[validator.id] = true
        }
      }

      function getSelectedCount() {
        return Object.keys(selectedValidators).length
      }

      return {
        isSelected: isSelected,
        toggleSelection: toggleSelection,
        getSelectedCount: getSelectedCount
      }
    })()
    
    $scope.ValidatorSelector = ValidatorSelector

    $scope.toggleSelected = function(validator) {
      ValidatorSelector.toggleSelection(validator)
      console.log(ValidatorSelector.isSelected(validator))
    }

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
    var ValidatorLoader = (function() {
      var scan = function(scope) {
        $http({
          url: VALIDATOR_REGISTRY_API+"/validators",
          method: "GET"
        }).success(function(data, status, headers, config) {
            scope.loading = false
            scope.validators = data.validators;
        }).error(function(data, status, headers, config) {
            scope.loading = true;
            scope.status = "Error Connecting to Validator Registry API";
        });
      }
      return {
        scan: scan
      }
    })()

    ValidatorLoader.scan($scope)
  });

