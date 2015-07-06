
angular.module('validatorsApp').factory('ValidatorsLoader',['$http', function($http) {

  return (function() {
    return {
      scan: function(scope) {
        $http({
          url: VALIDATOR_REGISTRY_API+"/validators",
          method: "GET"
        }).success(function(data, status, headers, config) {
            scope.loading = false
            scope.validators = data.validators;
        }).error(function(data, status, headers, config) {
            scope.loading = true;
            scope.status = "Error Connecting to Validator Registry API";
        })
      }
    }
  })()
}])
  
