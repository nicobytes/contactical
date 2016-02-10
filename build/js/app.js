/**
* @File the start the app
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';
  angular.module('myAddressBook', [
    // Core 
    'firebase',
    'ngMessages',
    //Widgets
    'app.widgets',
    //Feature areas
    'app.contacts',
  ])
})();

(function() {
  'use strict';
  angular.module('app.contacts', []);
})();
(function() {
  'use strict';
  angular.module('app.widgets', []);
})();


