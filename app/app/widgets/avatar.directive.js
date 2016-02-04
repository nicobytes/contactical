// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('appAvatar', appAvatar);

  appAvatar.$inject = [];

  function appAvatar() {
    var directive = {
      restrict: 'AE',
      scope: {
        name: '='
      },
      template:'<span class="avatar">{{ name[0] | proper }}</span>'
    };
    return directive;
  }
})();