describe('end to end tests', function() {

	it('should add a contact and not throw an error',function(done){
		browser.get('http://localhost:8080');
		browser.sleep(1000);
		element(by.model('add.newContact.name')).sendKeys('ivan camilo');
		element(by.model('add.newContact.email')).sendKeys('davos@onionknig.ht');
		element(by.id('submitNewContact')).click();	
		element.all(by.repeater('contact in list.contacts'))
		.then(function(contacts){
			expect(contacts.length).toEqual(2);
			done();	
		});
	});

	it('should display the contacts name correctly', function(done) {		
		element.all(by.repeater('contact in list.contacts'))
		.then(function(contacts){
			var newest = contacts[contacts.length-1];
			var name = newest.element(by.tagName('h4')).element(by.className('contact-name'));
			expect(name.getText()).toEqual("Ivan Camilo");
			done();
		});
  });

  it('should display the contacts avatar properly', function(done) {		
		element.all(by.repeater('contact in list.contacts'))
		.then(function(contacts){
			var newest = contacts[contacts.length-1];
			var avatar = newest.element(by.tagName('h4')).element(by.className('avatar'));
			expect(avatar.getText()).toEqual("I");			
		});
		done();
  });

});