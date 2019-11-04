'use strict'

var gulp = require('gulp');
//var pug = require('gulp-pug');
//var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();
var gp = require('gulp-load-plugins')();

gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
  browserSync.watch('build', browserSync.reload)
});

gulp.task('pug', function() {
    return gulp.src('src/pug/pages/*.pug')
    .pipe(gp.pug({
        pretty:true
    }))
    .pipe(gulp.dest('build'))
  });

  gulp.task('stylus', function() {
    return gulp.src('src/static/stylus/main.styl')
    .pipe(gp.sourcemaps.init())
    .pipe(gp.stylus({
      'include css': true
    }))
    .pipe(gp.autoprefixer({
      overrideBrowserslist: ['last 4 versions'],
      cascade: false
    }))

    .pipe(gp.csso())
    .pipe(gp.sourcemaps.write())
    .pipe(gulp.dest('build/css'))
  });

  gulp.task('scripts:lib', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/slick-carousel/slick/slick.min.js', 'src/static/other_Libs/bootstrap-3.3.7-dist/js/bootstrap.min.js'])
    .pipe(gp.concat('libs.min.js'))
    .pipe(gulp.dest('build/js'))
  });

  gulp.task('scripts', function() {
    return gulp.src('src/static/js/main.js')
    .pipe(gulp.dest('build/js'))
  });

  gulp.task('img', function () {
    gulp.src('src/static/img/**/*.*')
        //.pipe(tingpng('API_KEY'))
        .pipe(gulp.dest('build/img'));
    });  

  gulp.task('watch', function() {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/static/**/*.styl', gulp.series('stylus'));
    gulp.watch('src/static/js/*.js', gulp.series('scripts'));
  });

  gulp.task('default', gulp.series(
    gulp.parallel('pug','scripts:lib', 'scripts', 'stylus'),
    gulp.parallel('watch', 'serve')
  ));