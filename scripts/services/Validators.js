
angular.module('validatorsApp').factory('Validators',['$http', function($http) {

  var combined

  function fetchValidations() {
    return new Promise(function(resolve,reject) {
      http
        .get(window.config.VALIDATOR_REGISTRY_API+'/validations')
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            resolve(response.body.validations)
          }
        })
    })
  }

  function fetchValidators() {
    return new Promise(function(resolve,reject) {
      http
        .get(window.config.VALIDATOR_REGISTRY_API+'/validators')
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            resolve(response.body.validators)
          }
        })
    })
  }

  function getValidators() {
    if (combined) {
      return Promise.resolve(combined)
    } else {
      return fetchValidations().then(function(validations) {

        return fetchValidators().then(function(validators) {

          combined = sortByValidations(reduceValidators(validators, validations))
          return combined
        })
      })
    }
  }

  function sortByValidations(validations) {
    return _.sortBy(validations, function(validation) {
      return validation.validations_count * -1
    })
  }

  function reduceValidators(validators, validations) {
    var reduced = []
    validations.forEach(function(validation) {
      var validator = _.find(validators, function(validator) {
        return validator.validation_public_key === validation.validation_public_key
      })
      if (validator) {
        validation.domain = validator.domain
      }
      reduced.push(validation)
    })
    return reduced
  }

  function getDomain(validationPublicKey) {
    getValidators().then(function(validators) {
      var validator = _.find(validators, function(validator) {
        return validator.validation_public_key === validationPublicKey
      })
      if (validator) {
        return validator.domain
      } else {
        return undefined
      }
    })
  }

  return {
    fetch: fetchValidators,
    getValidators: getValidators,
    getDomain: getDomain
  }
}])

