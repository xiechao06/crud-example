var gulp = require('gulp');
var livereload = require('gulp-livereload');


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['index.html', 'js/**/*.js'], function () {
        gulp.src(['index.html', 'js/**/*.js']).pipe(livereload());
    });
    gulp.watch('js/**/*.jsx', ['react']);
});

gulp.task('serve', function () {
    require('child_process').spawn('http-server', {
        stdio: 'inherit'
    });
});

var react = require('gulp-react');

gulp.task('react', function () {
    return gulp.src('js/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('js')).pipe(livereload());
});

gulp.task('default', ['serve', 'watch']);
