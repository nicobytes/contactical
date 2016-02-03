module.exports = function( config ){
	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['mocha'],
		preprocessors:{
			'app/app/**/*.js': ['coverage']
		},
		coverageReporter:{
			includeAllSources: true,
			reporters: [
				{
					type: 'html',
					dir: 'tests/coverage',
					subdir: '.'
				},
				{
					type: 'text'
				}
			]
		},
		files: [
			'app/lib/angular/angular.min.js',
			'app/lib/angular-mocks/angular-mocks.js',
			'app/lib/chai/chai.js',
			//App
			'app/app/app.js',
			//Tests
			'tests/unit/**/*.spec.js'
		]
	});
}