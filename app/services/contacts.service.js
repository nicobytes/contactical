(function() {
  'use strict';

  angular
    .module('app')
    .factory('contactsService', contactsService);

  contactsService.$inject = [
    '$firebaseArray',
  ];

  function contactsService( $firebaseArray ) {
    
    var service = {
      getAllContacts: getAllContacts,
    };

    return service;

    ////////////

    function getAllContacts(){
      var reference = new Firebase('https://contactical.firebaseio.com/contacts');
      return $firebaseArray(reference);
    }

  }
})();