var gulp = require('gulp');
var riot = require('gulp-riot');
var livereload = require('gulp-livereload');


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['index.html', 'js/**/*.js', 'css/**/*.css'], function () {
        gulp.src(['index.html', 'js/**/*.js', 'css/**/*.css']).pipe(livereload());
    });
    gulp.watch('js/tags/*.tag', ['riot']);
    gulp.watch('postcss/*.css', ['postcss']);
});

gulp.task('serve', function () {
    require('child_process').spawn('http-server', {
        stdio: 'inherit'
    });
});

gulp.task('riot', function () {
    gulp.src('js/tags/*.tag').pipe(riot()).pipe(gulp.dest('js/tags/'));
});

gulp.task('postcss', function () {
    var postcss = require('gulp-postcss');
    return gulp.src('postcss/*.css')
        .pipe( postcss([require('precss')(), require('cssnext')(), require('cssnano')() ]) )
        .pipe( gulp.dest('css/') );
});
gulp.task('default', ['serve', 'watch']);
