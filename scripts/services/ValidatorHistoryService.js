
angular.module('validatorsApp').factory('ValidatorHistoryService',
  ['$http', function($http) {

  function fetch(validationPublicKey) {
    return new Promise(function(resolve, reject) {
      $http({
        url: "http://127.0.0.1:1337/reports/"+validationPublicKey,
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

