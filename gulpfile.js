var gulp = require("gulp");
var browserSync = require("browser-sync");
var karmaServer = require("karma").Server;
var paths = require('./gulp.config.json');

var protractor = require("gulp-protractor").protractor;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

gulp.task('serve', function(){
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

gulp.task('e2e', ['serve'], function(done){
	gulp.src(["tests/e2e/**/*.js"])
	.pipe(protractor({
		configFile: "protractor.conf.js",
		args: ['--baseUrl', 'http://127.0.0.1:8080']
	}))
	.on('end', done)
});

/**
 * Minify and bundle the js
 */
gulp.task('js', function(done) {

  var dest = paths.build + 'js';

  gulp.src( paths.js )
    .pipe(concat('app.js'))
    .pipe(gulp.dest( dest))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest( dest ))
    .on('end', done);
});

/**
 * Minify and bundle the vendors js
 */
gulp.task('vendorsjs', function( done ) {

  var dest = paths.build + 'js';

  gulp.src( paths.vendorjs )
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest( dest ))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest( dest ))
    .on('end', done);
});

/**
 * Minify and bundle the css
 */
gulp.task('css', function( done ) {

  var dest = paths.build + 'css';

  gulp.src( paths.css )
    .pipe(concat('app.css'))
    .pipe(gulp.dest( dest ))
    .pipe(cssnano())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest( dest ))
    .on('end', done);
});

/**
 * Bundling vendors for develop
 */
gulp.task('develop' , function ( done ) {
  var css = gulp.src( paths.css, {read: false});
  var vendors = gulp.src( paths.vendorjs, {read: false});
  var js = gulp.src( paths.js, {read: false});
  
  gulp.src( paths.index )
    .pipe( inject( css , {relative: true} ))
    .pipe( inject( vendors , {relative: true, name: 'vendors'} ))
    .pipe( inject( js, {relative: true} ))
    .pipe( gulp.dest('./app') )
    .on('end', done);
});

/**
 * Bundling, minifying, and copying the vendors for production
 */
gulp.task('production', [ 'css', 'vendorsjs', 'js' ] , function ( done ) {
  var css = gulp.src( paths.includeCss, {read: false});
  var vendors = gulp.src( paths.includeVendors, {read: false});
  var js = gulp.src( paths.includeJs, {read: false});
  
  gulp.src( paths.index )
    .pipe( inject( css , {relative: true} ))
    .pipe( inject( vendors , {relative: true, name: 'vendors'} ))
    .pipe( inject( js, {relative: true} ))
    .pipe( gulp.dest('./app') )
    .on('end', done);
});