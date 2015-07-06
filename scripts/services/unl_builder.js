
angular.module('validatorsApp').factory('UNLBuilder', function() {

  return {
    buildUNL: function(validators, quorum) {

      var unl = '[validators]\n'
      
      validators.forEach(function(validator) {
        unl += (validator.validation_public_key+'    '+validator.domain+'\n')
      })

      unl += '\n[quorum]\n'
      unl += quorum
      unl += '\n'

      return unl
    }
  }
})
  
