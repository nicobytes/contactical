describe("Service: contactsService", function(){

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function( $injector ){
    contactsService = $injector.get('contactsService');
  }));

  it("Should getAllContacts has been defined", function(){
    chai.assert.isDefined(contactsService.getAllContacts);
  });

  it("Should call the backend", function(){
    var contacts = contactsService.getAllContacts();
    chai.assert.isArray(contacts);
  });
});