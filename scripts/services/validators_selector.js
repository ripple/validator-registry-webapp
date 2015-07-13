
angular.module('validatorsApp').factory('ValidatorsSelectorService', function() {
  return (function() {
    var selectedValidators = {}

    function getSelectedValidators() {
      var validators = []
      Object.keys(selectedValidators).forEach(function(key) {
        validators.push(selectedValidators[key])
      })
      return validators
    }

    function isSelected(validator) {
      return selectedValidators[validator.validation_public_key] ? true : false
    }

    function toggleSelection(validator) {
      if (selectedValidators[validator.validation_public_key]) {
        delete selectedValidators[validator.validation_public_key]
      } else {
        selectedValidators[validator.validation_public_key] = validator
      }
    }

    function getSelectedCount() {
      return Object.keys(selectedValidators).length
    }

    function getQuorum() {
      var quorum = Math.ceil(Object.keys(selectedValidators).length * 0.8)
      return quorum
    }

    return {
      isSelected: isSelected,
      toggleSelection: toggleSelection,
      getSelectedCount: getSelectedCount,
      getSelectedValidators: getSelectedValidators,
      getQuorum: getQuorum
    }
  })()
})
  
