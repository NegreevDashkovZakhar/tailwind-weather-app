const del = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const tailwind = require('tailwindcss');
const ghPages = require('gulp-gh-pages');
const browserSync = require('browser-sync').create();

const path = {
    Base: 'src/',
    HTML: 'src/templates/*.html',
    CSS: 'src/styles/*.css',
    Javascript: 'src/scripts/*.js',
    Images: 'src/images/**',
    Build: {
        Base: 'build/',
        HTML: 'build/',
        CSS: 'build/styles',
        Javascript: 'build/scripts',
        Images: 'build/images',
        Deploy: 'build/**'
    }
};

function hotReload() {
    gulp.watch(path.HTML, {}, gulp.series(devHTML, devCSS));
    gulp.watch(path.CSS, {}, devCSS);
    gulp.watch(path.Images, {}, devImages);
    gulp.watch(path.Javascript,{},devJavascript);
    browserSync.watch(path.Build.Base).on("change", browserSync.reload);
    return browserSync.init({
        server: {
            baseDir: path.Build.HTML
        }
    });
}

function devImages() {
    return gulp.src(path.Images)
        .pipe(gulp.dest(path.Build.Images));
}

function devJavascript() {
    return gulp.src(path.Javascript).pipe(gulp.dest(path.Build.Javascript));
}

function devCSS() {
    return gulp.src(path.CSS)
        .pipe(postcss([
            tailwind('./tailwind.config.js'),
            autoprefixer]))
        .pipe(concat({ path: 'style.css' }))
        .pipe(gulp.dest(path.Build.CSS));
}

function devHTML() {
    return gulp.src(path.HTML).pipe(gulp.dest(path.Build.HTML));
}

function devClear() {
    return del(path.Build.Base);
}

function deploy() {
    return gulp.src(path.Build.Deploy)
        .pipe(ghPages({
            'remoteUrl':'git@github.com:NegreevDashkovZakhar/tailwind-weather-app.git',
            'origin':'origin',
            'branch':'gh-pages'
        }));
}

exports.default = gulp.series(
    devClear,
    devJavascript,
    devHTML,
    devCSS,
    devImages,
    hotReload
);

exports.deploy = gulp.series(
    devClear,
    devJavascript,
    devHTML,
    devCSS,
    devImages,
    deploy
);