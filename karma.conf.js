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
	    './app/lib/firebase/firebase.js',
	    './app/lib/angularfire/dist/angularfire.min.js',
			'app/lib/angular-mocks/angular-mocks.js',
			'app/lib/chai/chai.js',
			//App
			'./app/app/app.module.js',
	    './app/app/**/*.service.js',
	    './app/app/**/*.module.js',
	    './app/app/**/*.directive.js',
	    './app/app/**/*.filter.js',
	    './app/app/**/*.controller.js',
			//Tests
			'./tests/unit/**/*.service.spec.js',
	    './tests/unit/**/*.controller.spec.js',
	    './tests/unit/**/*.directive.spec.js',
	    './tests/unit/**/*.filter.spec.js'
		]
	});
}