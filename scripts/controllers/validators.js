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


    function setClipboard() {

      console.log('SET CLIPBOARD!')
      // main.js
      var client = new ZeroClipboard( document.getElementById("copy-button") );

      client.on( "ready", function( readyEvent ) {

        client.on( "aftercopy", function( event ) {

          // `this` === `client`
          // `event.target` === the element that was clicked
          event.target.style.display = "none";
          alert("Copied text to clipboard: \n" + event.data["text/plain"] );
          $('#copy-button').show()
          //setClipboard();
        } );
      });
    }

    setClipboard();

    $scope.loading = true

    $scope.unl_text = ''
      + '[validators]\n\n'
      + 'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7 ripple.com\n'
      + 'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj ripple.com\n'
      + 'n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C ripple.com\n'
      + 'n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS ripple.com\n'
      + 'n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA ripple.com\n';

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

