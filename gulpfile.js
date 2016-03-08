var gulp= require('gulp'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();


var config = {
    paths: {
        src: './src',
        dist: './.dist',
        bower: './bower_components'
    }
};

gulp.task('clean',function() {
    return gulp.src(config.paths.dist, {read: false})
        .pipe(clean());
});

gulp.task('inject',function(){

    var sources = gulp.src([
        config.paths.src+'/**/*.js',
        config.paths.src+'/**/*.css'
    ],{read:false});

    return gulp.src(config.paths.src+'/index.html')
        .pipe(inject(gulp.src(bowerFiles(),{read:false}),{name:'bower'}))
        .pipe(inject(sources,{ignorePath: 'src', addRootSlash: false}))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('server',['inject'],function(){
    browserSync.init({
        port:3010,
        server:{

            //list of all directory.
            baseDir:[config.paths.dist,config.paths.bower, config.paths.src],

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


//every task is like this. getting source, apply plugin, what to do with output
gulp.task('demo',function(){
    return gulp.src('src/**/*')
        .pipe(gulpPlugin)
        .pipe(gulp.dest('.dist'));
});

