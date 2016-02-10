describe("The proper filter", function(){

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function( $filter ){
    proper = $filter("proper");
  }));

  it("Should show the filter proper in case a string", function(){
    chai.expect(proper("ned stack")).to.equal("Ned Stack");
    chai.expect(proper("Nicolas mOLINA")).to.equal("Nicolas MOLINA");
  });

  it("Should show the filter proper in case a number", function(){
    chai.expect(proper(23)).to.equal("23");
    chai.expect(proper("34")).to.equal("34");
  });

  it("Should throw an error on an incompatible type", function(){
    chai.assert.throws(function(){
      proper(undefined);
    });
    chai.assert.throws(function(){
      proper([]);
    });
  });

});