describe("Controller: ContactsListCtrl", function(){

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function( $injector, _$rootScope_, $controller){

    $rootScope = _$rootScope_;

    ContactsListCtrl = $controller('ContactsListCtrl', {
      contactsService: $injector.get('contactsService')
    });

  }));

  it("Should contacts has been defined", function(){
    chai.assert.isDefined(ContactsListCtrl.contacts);
  });

  it("Should contacts to be array", function(){
    chai.assert.isArray(ContactsListCtrl.contacts);
  });
  
});