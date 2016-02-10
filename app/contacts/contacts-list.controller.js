(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller('ContactsListCtrl', ContactsListCtrl);

  ContactsListCtrl.$inject = [
    'contactsService',
  ];

  function ContactsListCtrl( contactsService ) {

    var vm = this;
    vm.contacts = contactsService.getAllContacts();

  }
})();