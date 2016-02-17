var gulp = 			require('gulp');
var babel = 		require('gulp-babel');
var uglify = 		require('gulp-uglify');
var concat = 		require('gulp-concat');
var sourcemaps = 	require('gulp-sourcemaps');

gulp.task('default', ['dist']);

gulp.task('dev-es5', function() {

    gulp.src('es6/**/*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dev'));

});

gulp.task('dev', ['dev-es5']);

gulp.task('dist-es5', function() {

    gulp.src('es6/**/*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(uglify().on('error', function(e){
            console.log('Uglify Error: ', e);
         }))
    .pipe(gulp.dest('dist'));

});

gulp.task('dist', ['dist-es5']);

gulp.task('watch', function() {

	gulp.watch(['es6/**/*.js'], ['dev']);

});