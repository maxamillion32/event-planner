var gulp = 			require('gulp');
var connect = 		require('gulp-connect');
var sass = 			require('gulp-sass');
var concat = 		require('gulp-concat');
var uglify = 		require('gulp-uglify');
var htmlmin =    	require('gulp-htmlmin');
var mergeStream = 	require('merge-stream');
var babel = 		require('gulp-babel');
var sourcemaps = 	require('gulp-sourcemaps');
var inject = require('gulp-inject');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rimraf = require('gulp-rimraf');
var browserSync = require('browser-sync').create();
 
/**************
  Lint
***************/   
gulp.task('lint', function() {
  return gulp.src('./public/**/*.js')
    .pipe(jshint().on('error', function(err) {
      console.log('Lint: ', err);
    }))
    .pipe(jshint.reporter(stylish));
});

/***************
  Docs
****************/
gulp.task('js-doc', shell.task(['./node_modules/jsdoc/jsdoc.js -r ./public/js -d ./docs']));

/****************
  Serve
 ****************/ 
gulp.task('serve-docs', function() {
  connect.server({
    root: ['docs'],
    port: 8800
  });
});
 
gulp.task('serve', function() {
  browserSync.init({
        server: {
            baseDir: "./dev",
        }
    });
});

gulp.task('serve-dist', function() {
  connect.server({
    root: ['dist'],
    port: 8880
  });
});

/******************
  Clean
*******************/
gulp.task('dev-clean', function() {

  return gulp.src('./dev/*', { read: false }).pipe(rimraf().on('error', function(err) {

    console.log('Rimraf: ', err)

  }));

});

gulp.task('dist-clean', function() {

  return gulp.src('./dist/*', { read: false }).pipe(rimraf().on('error', function(err) {

    console.log('Rimraf: ', err)

  }));

});

/******************
	Copy
*******************/
gulp.task('dev-copy', function () {
  return mergeStream(
    gulp.src('./public/assets/**/*').pipe(gulp.dest('./dev/assets')),
    gulp.src('./bower_components/**/*').pipe(gulp.dest('./dev/bower_components'))
    .pipe(browserSync.stream())
  );
});

gulp.task('dist-copy', function () {
  return mergeStream(
    gulp.src('./public/assets/**/*').pipe(gulp.dest('./dist/assets')),
    gulp.src('./bower_components/**/*').pipe(gulp.dest('./dist/bower_components'))
  );
});

/******************
	Styles
*******************/

gulp.task('dev-styles', function() {
	gulp.src('./public/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./dev/css'))
  .pipe(browserSync.stream())
});

gulp.task('dist-styles', function() {
	gulp.src('./public/sass/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./dist/css'))
});

/******************
	JS
*******************/
gulp.task('dev-js', function() {

    gulp.src('./public/js/**/*.js')
    //.pipe(sourcemaps.init())
    .pipe(babel({comments: false}).on('error', function(e){
            console.log('Bablify Error: ', e);
         }))
    //.pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dev/js'))
    .pipe(browserSync.stream())

});

gulp.task('dist-js', function() {

    gulp.src('./public/js/**/*.js')
    .pipe(babel({comments: false}).on('error', function(e){
            console.log('Bablify Error: ', e);
         }))
    .pipe(uglify().on('error', function(e){
            console.log('Uglify Error: ', e);
         }))
    .pipe(gulp.dest('./dist/js'));

});

/******************
	html
*******************/
gulp.task('dev-concat-minify', function() {

  return gulp.src('./public/index.html')
    .pipe(inject(gulp.src(['./public/partials/**/*.html']), {
      starttag: '<!-- inject:body:{{ext}} -->',
      transform: function(filePath, file) {
        return file.contents.toString('utf8')
      }
    }).on('error', function(e) {
      console.log('Inject Error: ', e)
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest('./dev'))
    .pipe(browserSync.stream());
});

gulp.task('dist-concat-minify', function() {
  return gulp.src('./public/index.html')
    .pipe(inject(gulp.src(['./public/partials/**/*.html']), {
      starttag: '<!-- inject:body:{{ext}} -->',
      transform: function(filePath, file) {
        return file.contents.toString('utf8')
      }
    }).on('error', function(e) {
      console.log('Inject Error: ', e)
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

/******************
	tasks
*******************/
gulp.task('dev', ['dev-copy', 'dev-styles', 'lint', 'dev-js', 'dev-concat-minify', 'js-doc', 'watch']);
gulp.task('dist', ['dist-copy', 'dist-styles', 'lint', 'dist-js', 'dist-concat-minify']);
gulp.task('default', ['dev', 'serve', 'serve-docs']);
gulp.task('watch', ['dev-copy', 'dev-styles', 'lint', 'dev-js', 'dev-concat-minify', 'js-doc'], function() {

	gulp.watch(['./public/**/*'], ['dev']);

});