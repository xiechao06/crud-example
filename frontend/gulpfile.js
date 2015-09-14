var gulp = require('gulp');
var riot = require('gulp-riot');
var livereload = require('gulp-livereload');


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['index.html', 'js/**/*.js'], function () {
        gulp.src(['index.html', 'js/**/*.js']).pipe(livereload());
    });
    gulp.watch('js/tags/*.tag', ['riot']);
});

gulp.task('serve', function () {
    require('child_process').spawn('http-server', {
        stdio: 'inherit'
    });
});

gulp.task('riot', function () {
    gulp.src('js/tags/*.tag').pipe(riot()).pipe(gulp.dest('js/tags/'));
});

gulp.task('default', ['serve', 'watch']);
