
angular.module('validatorsApp').factory('Validators',['$http', function($http) {

  var combined
  var DATE = moment().subtract(1, 'day').format('YYYY-MM-DD')

  function fetchReport() {
    return new Promise(function(resolve,reject) {
      http
        .get(window.config.VALIDATOR_REGISTRY_API+'/reports/'+DATE)
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            resolve(response.body.report)
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
          combined = sortByAgreementCoefficient(reduced)

          return combined
        })
      })
    }
  }

  function sortByAgreementCoefficient(validations) {
    return _.sortBy(validations, function(validation) {
      return validation.agreement_coefficient * -1
    })
  }

  function reduceValidators(validators, report) {
    var reduced = []

    report.entries.forEach(function(validatatorReportEntry) {
      var validator = _.find(validators, function(validator) {
        return validator.validation_public_key === validatatorReportEntry.validation_public_key
      })

      if (!validator) {
        validator = validatatorReportEntry
        validator.domain = null
      }

      reduced.push({
        validation_public_key: validator.validation_public_key,
        agreement_coefficient: validatatorReportEntry.agreement_coefficient,
        disagreement_coefficient: validatatorReportEntry.disagreement_coefficient,
        validations: validatatorReportEntry.validations,
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

