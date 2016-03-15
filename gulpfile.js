var gulp = require('gulp'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    clean = require('gulp-clean'),
    angularFileSort = require('gulp-angular-filesort'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglifyJs = require('gulp-uglify'),
    filter = require('gulp-filter'),
    mergeStream = require('merge-stream'),
    browserSync = require('browser-sync').create();


var config = {
    paths: {
        src: './src',
        build: './build',
        bower: './bower_components'
    }
};

gulp.task('clean', function () {
    return gulp.src(config.paths.build, {read: false})
        .pipe(clean());
});

gulp.task('inject', function () {

    var cssFiles = gulp.src([
        config.paths.src + '/**/*.css'
    ], {read: false});

    var jsFiles = gulp.src([
        config.paths.src + '/**/*.js'
    ]).pipe(angularFileSort());


    return gulp.src(config.paths.src + '/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(cssFiles, {ignorePath: 'src', addRootSlash: false}))
        .pipe(inject(jsFiles, {ignorePath: 'src', addRootSlash: false}))
        .pipe(gulp.dest(config.paths.build));
});

//for development
gulp.task('server',['inject'], function () {
    browserSync.init({
        port: 3010,
        server: {
            //list of all directory.
            baseDir: [config.paths.build,config.paths.src,config.paths.bower],
            //remove bower_component from URI path.
            routes: {
                '/bower_components': "bower_components"
            }
        },
        //list of files when change, browser will update.
        files: [
            config.paths.src + '/**',
        ]
    });
});

//for optimize dev build
gulp.task('minifyCss', function () {

    var vendorStyles =  gulp.src(bowerFiles()).
                        pipe(filter(['**/*.css'])).
                        pipe(concat('vendor.min.css')).
                        pipe(cleanCss()).
                        pipe(gulp.dest(config.paths.build + '/styles'));

    var appStyles =  gulp.src(config.paths.src+'/**/*.css').
                        pipe(concat('app.min.css')).
                        pipe(cleanCss()).
                        pipe(gulp.dest(config.paths.build + '/styles'));

    return mergeStream(vendorStyles,appStyles);
});

gulp.task('minifyJs', function () {

    var vendorJs =  gulp.src(bowerFiles()).
                    pipe(filter(['**/*.js'])).
                    pipe(concat('vendor.min.js')).
                    pipe(uglifyJs()).
                    pipe(gulp.dest(config.paths.build + '/scripts'));

    var appJs =  gulp.src(config.paths.src+'/**/*.js').
                    pipe(angularFileSort()).
                    pipe(concat('app.min.js')).
                    pipe(uglifyJs()).
                    pipe(gulp.dest(config.paths.build + '/scripts'));

    return mergeStream(vendorJs,appJs);
});

gulp.task('htmls', function (){
    return gulp.src([config.paths.src + '/**/*.html','!'+config.paths.src+'/index.html']).
            pipe(gulp.dest(config.paths.build));
});

gulp.task('others', function (){
    return gulp.src([config.paths.src + '/**/*.*' , '!**/*.html', '!**/*.css', '!**/*.js']).
    pipe(gulp.dest(config.paths.build));
});

gulp.task('build',['minifyCss','minifyJs','htmls','others'],function () {

    var vendorFiles = gulp.src([
        config.paths.build + '/styles/vendor.min.css',
        config.paths.build + '/scripts/vendor.min.js'
    ], {read: false});

    var appFiles = gulp.src([
        config.paths.build + '/styles/app.min.css',
        config.paths.build + '/scripts/app.min.js'
    ], {read: false});

    return gulp.src(config.paths.src + '/index.html')
        .pipe(inject(vendorFiles, {name:'vendor.min',ignorePath: 'build', addRootSlash: false}))
        .pipe(inject(appFiles, {name:'app.min',ignorePath: 'build', addRootSlash: false}))
        .pipe(gulp.dest(config.paths.build));
});