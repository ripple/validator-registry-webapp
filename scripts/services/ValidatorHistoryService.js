
angular.module('validatorsApp').factory('ValidatorHistoryService',
  ['$http', function($http) {

  console.log('in validator history service', window.config)

  function fetch(validationPublicKey) {
    return new Promise(function(resolve, reject) {
      $http({
        url: window.config.VALIDATOR_REGISTRY_API+"/reports/"+validationPublicKey,
        method: "GET"
      }).success(function(data, status, headers, config) {
        resolve(data.reports)
      }).error(function(data, status, headers, config) {
        reject(new Error(data))
      })
    })
  }

  return {
    fetch: fetch
  }
}])

