var gulp = 			require('gulp');
var connect = 		require('gulp-connect');
var sass = 			require('gulp-sass');
var concat = 		require('gulp-concat');
var uglify = 		require('gulp-uglify');
var htmlmin =    	require('gulp-htmlmin');
var mergeStream = 	require('merge-stream');
var babel = 		require('gulp-babel');
var sourcemaps = 	require('gulp-sourcemaps');
 
gulp.task('serve', function() {
  connect.server({
  	root: ['dev'],
    livereload: true
  });
});

/******************
	Copy
*******************/
gulp.task('dev-copy', function () {
  return mergeStream(
    gulp.src('./public/assets/**/*').pipe(gulp.dest('./dev/assets')),
    gulp.src('./bower_components/**/*').pipe(gulp.dest('./dev/bower_components'))
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
    .pipe(sourcemaps.init())
    .pipe(babel().on('error', function(e){
            console.log('Bablify Error: ', e);
         }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dev/js'));

});

gulp.task('dist-js', function() {

    gulp.src('./public/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel().on('error', function(e){
            console.log('Bablify Error: ', e);
         }))
    .pipe(concat('all.js'))
    .pipe(uglify().on('error', function(e){
            console.log('Uglify Error: ', e);
         }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dist/js'));

});

/******************
	html
*******************/
gulp.task('dev-minify', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dev'))
});

gulp.task('dist-minify', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

/******************
	tasks
*******************/
gulp.task('dev', ['dev-copy', 'dev-styles', 'dev-js', 'dev-minify']);
gulp.task('dist', ['dist-copy', 'dist-styles', 'dist-js', 'dist-minify']);
gulp.task('default', ['dist']);
gulp.task('watch', function() {

	gulp.watch(['./public/**/*'], ['dev']);

});