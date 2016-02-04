(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller('AddContactCtrl', AddContactCtrl);

  AddContactCtrl.$inject = [
    'contactsService',
  ];

  function AddContactCtrl( contactsService ) {

    var vm = this;
    vm.contacts = contactsService.getAllContacts();
    vm.newContact = {};
    vm.addContact = addContact;

    function addContact( form ){
      vm.contacts.$add(vm.newContact)
      .then( complete );

      function complete(){
        vm.newContact = {};
        form.$setPristine();
        form.$setUntouched();
      }
      
    }

  }
})();