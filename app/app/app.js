angular.module("myAddressBook", [])
.factory("contactsService", function( $http, $q ){
	var contacts = [];
	return {
		getAllContacts: function(){
			return $http.get('http://localhost:9001/contacts')
				.then( complete )
				.catch( failed );

				function complete( response ){
					contacts = response.data;
					return $q.when( contacts );
				}

				function failed( response ){
					return $q.reject( response );
				}
		},
		addContact: function( contact ){
			contacts.push( contact );
		}
	}
})
.controller('ContactsController', function(contactsService, $scope, $rootScope){
	var vm = this;
	vm.contacts = [];

	activate();

	///////////////

	function activate(){
		getContacts();
	};

	function getContacts(){
		contactsService.getAllContacts()
			.then( complete )
			.catch( failed );

			function complete( contacts ){
				vm.contacts = contacts;
			}

			function failed( error ){
				console.log( error );
			}
	}

})
.controller('AddContact', function(contactsService, $scope, $rootScope){
	var vm = this;
	vm.newContact = {};
	vm.addContact = addContact;

	function addContact(){
		contactsService.addContact(vm.newContact);
	}

})
.filter('proper', function(){
	return function( name ){
		var type = typeof name;
		if(type !== 'string' && type !== 'number') throw new Error();
		return name.toString().split(" ").map(function(word){
			return word[0].toUpperCase().concat(word.slice(1));
		}).join(" ");
	}
})
.directive('avatar', function(){
	return{
		restrict: 'AE',
		scope: {
			name: '='
		},
		template:'<span class="avatar">{{ name[0] | proper }}</span>'
	}
});
