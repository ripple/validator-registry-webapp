
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
      return selectedValidators[validator.id] ? true : false
    }

    function toggleSelection(validator) {
      if (selectedValidators[validator.id]) {
        delete selectedValidators[validator.id]
      } else {
        selectedValidators[validator.id] = validator
      }
    }

    function getSelectedCount() {
      return Object.keys(selectedValidators).length
    }

    function getQuorum() {
      var quorum = Math.ceil(Object.keys(selectedValidators).length * 0.8)
      return quorum
    }

    function buildUNL() {
      return 'THE UNL!'
    }

    return {
      isSelected: isSelected,
      toggleSelection: toggleSelection,
      getSelectedCount: getSelectedCount,
      getSelectedValidators: getSelectedValidators,
      getQuorum: getQuorum,
      buildUNL: buildUNL
    }
  })()
})
  
