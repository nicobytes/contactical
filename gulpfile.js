var gulp = require("gulp");
var browserSync = require("browser-sync");
var karmaServer = require("karma").Server;
var server = require("gulp-live-server");
var protractor = require("gulp-protractor").protractor;

gulp.task('serve', ['server'] , function(){
	browserSync.init({
		notify: false,
		port: 8080,
		server: {
			baseDir: ['app']
		}
	});

	gulp.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
});

gulp.task('serve-test', function(){
	browserSync.init({
		notify: false,
		port: 8081,
		server: {
			baseDir: ['tests/unit', 'app']
		}
	});

	gulp.watch(['app/**/*.*', 'tests/unit/**/*.spec.js'])
		.on('change', browserSync.reload);
});

gulp.task('serve-coverage', ['tests-unit'], function(){
	browserSync.init({
		notify: false,
		port: 7777,
		server: {
			baseDir: ['tests/coverage']
		}
	});
});

gulp.task('tests-unit', function( done ){
	var config = {
		configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    reporters: ['mocha','coverage']
	};	
	new karmaServer(config, done).start();
});

gulp.task('server', function(){
	var live = new server('server.js');
	live.start();
});

gulp.task('e2e', ['serve'], function(done){
	gulp.src(["tests/e2e/**/*.js"])
	.pipe(protractor({
		configFile: "protractor.conf.js",
		args: ['--baseUrl', 'http://127.0.0.1:8080']
	}))
	.on('end', done)
});