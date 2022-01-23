const del = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const tailwind = require('tailwindcss');
const browserSync = require('browser-sync').create();

const path = {
    Base: 'src/',
    HTML: 'src/templates/*.html',
    CSS: 'src/styles/*.css',
    Images: 'src/images/**',
    Build: {
        Base: 'build/',
        HTML: 'build/',
        CSS: 'build/styles',
        Images: 'build/images'
    }
};

function hotReload() {
    gulp.watch(path.HTML, {}, gulp.series(devHTML, devCSS));
    gulp.watch(path.CSS, {}, devCSS);
    gulp.watch(path.Images, {},devImages);
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

exports.default = gulp.series(
    devClear,
    devHTML,
    devCSS,
    devImages,
    hotReload
);