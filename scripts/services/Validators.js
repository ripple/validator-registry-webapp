
angular.module('validatorsApp').factory('Validators',['$http', function($http) {

  var combined

  function fetchReport() {
    return new Promise(function(resolve,reject) {
      http
        .get(window.config.VALIDATOR_REGISTRY_API+'/reports')
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            resolve(response.body.report.validators)
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
      return fetchReport().then(function(report) {

        return fetchValidators().then(function(validators) {

          var reduced = reduceValidators(validators, report)
          combined = sortByCorrelationCoefficient(reduced)

          return combined
        })
      })
    }
  }

  function sortByCorrelationCoefficient(validations) {
    return _.sortBy(validations, function(validation) {
      return validation.correlation_coefficient * -1
    })
  }

  function reduceValidators(validators, report) {
    var reduced = []

    _.keys(report).forEach(function(validationPublicKey) {

      var validator = _.find(validators, function(validator) {
        return validator.validation_public_key === validationPublicKey
      })

      reduced.push({
        validation_public_key: validationPublicKey,
        correlation_coefficient: report[validationPublicKey].correlation_coefficient || 0,
        divergence_coefficient: undefined,
        validations: report[validationPublicKey].validations,
        domain: validator.domain
      })
    })

    return reduced
  }

  function getDomain(validationPublicKey) {
    return getValidators().then(function(validators) {
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

