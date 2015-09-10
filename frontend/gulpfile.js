var gulp = require('gulp');
var livereload = require('gulp-livereload');


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['index.html', 'js/**/*.js'], function () {
        gulp.src(['index.html', 'js/**/*.js']).pipe(livereload());
    });
});

gulp.task('serve', function () {
    require('child_process').spawn('http-server', {
        stdio: 'inherit'
    });
});

gulp.task('default', ['serve', 'watch']);
