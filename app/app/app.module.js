/**
* @File the start the app
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';
  angular.module('app', [
    // Core 
    'firebase',
    //'ngMessages',
    //Widgets
    'app.widgets',
    'app.filters',
    //Feature areas
    'app.contacts',
  ])
})();