
const VALIDATOR_REGISTRY_API = 'https://api.validators.ripple.com'

angular.module('validatorsApp').factory('ValidatorHistoryService',
  ['$http', function($http) {

  function fetch(validationPublicKey) {
    return new Promise(function(resolve, reject) {
      $http({
        url: VALIDATOR_REGISTRY_API+"/reports/"+validationPublicKey,
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

