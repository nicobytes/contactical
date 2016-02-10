describe("The avatar directive", function(){

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function( $rootScope, $compile  ){
    $rootScope.contact = {name: 'anico as'};
    element = $compile('<app-avatar name="contact.name"></app-avatar>')($rootScope);
    $rootScope.$digest();
  }));

  it("Should display the capitalized first letter of a name", function(){
    chai.expect(element.text()).to.equal("A");
  });
});