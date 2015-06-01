var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function() {
    gulp.src('app/**/*.js')
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src('app/**/*.css')
        .pipe(gulp.dest('css'));
});

gulp.task('dev', function() {
    connect.server({
        port: 8080,
        root: 'app',
        livereload: true
    });
});

gulp.task('hint', function() {
    gulp.src('app/js/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('html', function() {
    gulp.src('app/**/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src('app/**/*.css')
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    gulp.src('app/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(['app/**/*.js'], ['hint', 'scripts']);
    gulp.watch(['app/**/*.css'], ['css']);
});

gulp.task('default', ['dev', 'watch']);
