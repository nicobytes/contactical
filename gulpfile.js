var gulp = require("gulp");
var browserSync = require("browser-sync");
var karmaServer = require("karma").Server;
var server = require("gulp-live-server");

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

gulp.task('tests-unit', function( done ){
	var config = {
		configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    reporters: ['mocha']
	};	
	new karmaServer(config, done).start();
});

gulp.task('server', function(){
	var live = new server('server.js');
	live.start();
});