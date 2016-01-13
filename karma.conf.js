module.exports = function( config ){
	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['mocha'],
		files: [
			'app/lib/angular/angular.min.js',
			'app/lib/chai/chai.js',
			//App
			'app/app/app.js',
			//Tests
			'tests/unit/**/*.spec.js'
		]
	});
}