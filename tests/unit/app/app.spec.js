var assert = chai.assert;
var expect = chai.expect;

describe("The address Book App", function(){
	

	describe("The contact Service", function(){

		var contactsService, $httpBackend;

		beforeEach(function(){
			module("myAddressBook");
			inject(function( $injector ){
				contactsService = $injector.get('contactsService');
				$httpBackend = $injector.get('$httpBackend');
			});
		});

		it("Should getAllContacts has been defined", function(){
			expect(contactsService.getAllContacts).to.be.defined;
		});

		it("Should call the backend", function( done ){
			var rta = [];
			$httpBackend.expectGET('http://localhost:9001/contacts').respond(200, rta);
			contactsService.getAllContacts().then(function(respond){
				assert.isArray(respond);
				done();
			});
			$httpBackend.flush();
		});
	});

	describe("The ContactsController", function(){

		var ContactsController, $httpBackend, scope;

		beforeEach(function(){
			module("myAddressBook");
			inject(function( $injector, $rootScope, $controller, _contactsService_ ){
				scope = $rootScope.$new();
				$httpBackend = $injector.get('$httpBackend');
				ContactsController = $controller('ContactsController' , {
					$scope : scope,
					contactsService: _contactsService_
				});
			});
		});


		it("Should contacts has been defined", function(){
			expect(ContactsController.contacts).to.be.defined;
		});

		it("Should contacts to be array", function(){
			assert.isArray(ContactsController.contacts);
		});

		it("Should contacts to be deepEqual of response", function(){
			var rta = [1,2,4];
			$httpBackend.expectGET('http://localhost:9001/contacts').respond(200, rta);
			$httpBackend.flush();
			assert.deepEqual(ContactsController.contacts, rta);
		});



	});

	describe("The proper filter", function(){
		var proper;
		beforeEach(function(){
			module("myAddressBook");
			inject(function( $injector, $filter ){
				proper = $filter("proper");
			});
		});

		it("Should show the filter proper in case a string", function(){
			expect(proper("ned stack")).to.equal("Ned Stack");
			expect(proper("Nicolas mOLINA")).to.equal("Nicolas MOLINA");
		});

		it("Should show the filter proper in case a number", function(){
			expect(proper(23)).to.equal("23");
			expect(proper("34")).to.equal("34");
		});

		it("Should throw an error on an incompatible type", function(){
			assert.throws(function(){
				proper(undefined);
			});
			assert.throws(function(){
				proper([]);
			});
		});

	});

	describe("The avatar directive", function(){

		var element;
		beforeEach(function(){
			module("myAddressBook");
			inject(function( $rootScope, $compile ){
				$rootScope.contact = {name: 'anico as'};
				element = $compile('<avatar name="contact.name"></avatar>')($rootScope);
				$rootScope.$digest();
			});
		});
		it("Should display the capitalized first letter of a name", function(){
			expect(element.text()).to.equal("A");
		});
	});
});