var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var argv = require('yargs').argv;

gulp.task('serve-dev', function() {
    var options = {
        script: './koa-app.js',
        execMap: {
            "js": "node --harmony"
        },
        delayTime: 1,
        env: {
            'PORT': parseInt(argv.p) || 8080,
            'NODE_ENV': 'dev'
        },
        watch: ['./']
    };

    return nodemon(options);
});

gulp.task('default', ['serve-dev']);
