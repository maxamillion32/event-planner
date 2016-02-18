var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var mergeStream = 	require('merge-stream');
var babel = 		require('gulp-babel');
var sourcemaps = 	require('gulp-sourcemaps');

gulp.task('default', ['es6', 'styles']);

gulp.task('es6', function() {

	gulp.src('es6/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel().on('error', function(e){
            console.log('Bablify Error: ', e);
         }))
    .pipe(uglify().on('error', function(e){
            console.log('Uglify Error: ', e);
         }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dist/scripts'));

});

gulp.task('styles', function() {

	gulp.src('sass/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error',  sass.logError))
	.pipe(gulp.dest('dist/styles'));

});