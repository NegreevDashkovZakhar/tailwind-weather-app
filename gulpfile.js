const del = require('del');
const { src, dest, series } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const tailwind = require('tailwindcss');


const path = {
    HTML: 'src/templates/*.html',
    CSS: 'src/styles/*.css',
    Build: {
        Base: 'build/',
        HTML: 'build/pages/',
        CSS: 'build/'
    }
};

function devCSS() {
    return src(path.CSS)
        .pipe(postcss([
            tailwind('./tailwind.config.js'),
            autoprefixer]))
        .pipe(concat({ path: 'style.css' }))
        .pipe(dest(path.Build.CSS));
}

function devHTML() {
    return src(path.HTML).pipe(dest(path.Build.HTML));
}

function devClear() {
    return del(path.Build.Base);
}

exports.default = series(
    devClear,
    devHTML,
    devCSS
);