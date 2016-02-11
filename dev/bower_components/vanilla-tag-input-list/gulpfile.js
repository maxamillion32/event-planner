var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('default', ['scripts', 'styles']);

gulp.task('scripts', function() {

	gulp.src('scripts/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'));

});

gulp.task('styles', function() {

	gulp.src('sass/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error',  sass.logError))
	.pipe(gulp.dest('dist/styles'));

});