describe('end to end tests', function() {
	it('should have contact', function(done){
		browser.get('http://localhost:8080');

		element.all(by.repeater('contact in list.contacts'))
		.then(function( contacts ){
			var text = contacts[0].getText();
			expect(text).toEqual('nicolas molina N');
			done();
		});
	})
});