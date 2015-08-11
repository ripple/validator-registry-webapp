
angular.module('validatorsApp').factory('Validators',['$http', function($http) {

  var validators

  function fetch() {
    return new Promise(function(resolve,reject) {
      http
        .get(window.config.VALIDATOR_REGISTRY_API+'/validators')
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            validators = response.body.validators
            resolve(validators)
          }
        })
    })
  }

  function getValidators() {
    if (validators) {
      return new Promise(function(resolve, reject) {
        resolve(validators)
      })  
    } else {
      return fetch()
    }
  }

  function getDomain(validationPublicKey) {
    var validator = _.find(validators, function(validator) {
      return validator.validation_public_key === validationPublicKey
    })
    if (validator) {
      return validator.domain
    } else {
      return undefined
    }
  }

  return {
    fetch: fetch,
    getValidators: getValidators,
    getDomain: getDomain
  }
}])
  
