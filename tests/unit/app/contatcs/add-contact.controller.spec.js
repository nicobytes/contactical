describe("Controller: AddContactCtrl", function(){

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function( $injector, _$rootScope_, $controller){

    $rootScope = _$rootScope_;

    AddContactCtrl = $controller('AddContactCtrl', {
      contactsService: $injector.get('contactsService')
    });

  }));

  it("Should contacts has been defined", function(){
    chai.assert.isDefined(AddContactCtrl.contacts);
  });

  it("Should contacts to be array", function(){
    chai.assert.isArray(AddContactCtrl.contacts);
  });

  it("Should newContact be a object", function(){
    chai.assert.isObject(AddContactCtrl.newContact);
  });

  it("Should newContact be empty", function(){
    chai.expect(AddContactCtrl.newContact).to.be.empty;
  });

  it("Should addContact has been defined", function(){
    chai.assert.isDefined(AddContactCtrl.addContact);
    chai.assert.isFunction(AddContactCtrl.addContact);
  });

  it("Should contacts to be deepEqual of response", function(){
    AddContactCtrl.newContact = {
      name: 'Prueba',
      age: 22,
      occupation: 'Developer',
      email: 'mail@domain.com'
    };
    var size_after = AddContactCtrl.contacts.length;
    AddContactCtrl.addContact();
    $rootScope.$digest();
    var size_before = AddContactCtrl.contacts.length;
    chai.assert.equal( size_after + 1, size_before );
  });
});