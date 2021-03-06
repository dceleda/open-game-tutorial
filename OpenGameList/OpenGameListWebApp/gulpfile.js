﻿/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    gp_clean = require('gulp-clean'),
    gp_concat = require('gulp-concat'),
    gp_sourcemaps = require('gulp-sourcemaps'),
    gp_typescript = require('gulp-typescript'),
    gp_uglify = require('gulp-uglify')
    ;

var srcPaths = {
    app: ['Scripts/app/main.ts', 'Scripts/app/**/*.ts'],
    js_rxjs: ['node_modules/rxjs/**'],
    js: ['Scripts/js/**/*.js', 'node_modules/core-js/client/shim.min.js', 'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/test/Reflect.js', 'node_modules/systemjs/dist/system.src.js', 'node_modules/typescript/lib/typescript.js'],
    js_angular: ['node_modules/@angular/**']
    
};

var destPaths = {
    app: 'wwwroot/app/',
    js_rxjs: 'wwwroot/js/rxjs/',
    js: 'wwwroot/js/',
    js_angular: 'wwwroot/js/@angular/'
   
};

gulp.task('app', ['app_clean'], function () {
    return gulp.src(srcPaths.app)
        .pipe(gp_sourcemaps.init())
        .pipe(gp_typescript(require('./tsconfig.json').compilerOptions))
        .pipe(gp_uglify({ mangle: false }))
        .pipe(gp_sourcemaps.write('/'))
        .pipe(gulp.dest(destPaths.app));
});

gulp.task('app_clean', function () {
    gulp.src(srcPaths.js_angular)
        .pipe(gulp.dest(destPaths.js_angular));
    gulp.src(srcPaths.js_rxjs)
        .pipe(gulp.dest(destPaths.js_rxjs));
    return gulp.src(destPaths.app + "*", { read: false })
        .pipe(gp_clean({ force: true }));
});

gulp.task('js', function () {
    return gulp.src(srcPaths.js)
        .pipe(gulp.dest(destPaths.js));
});

gulp.task('js_clean', function () {
    return gulp.src(destPaths.js + "*", { read: false })
        .pipe(gp_clean({ force: true }));
});

gulp.task('watch', function () {
    gulp.watch([srcPaths.app, srcPaths.js], ['app', 'js']);
});

gulp.task('cleanup', ['app_clean', 'js_clean']);


gulp.task('default', ['app', 'js', 'watch']);