const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');

//style
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps');


//scripts
var uglify = require('gulp-uglify');

//webpack
const compiler = require('webpack');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const paths = {
    root: 'build',

    html: {
        src: 'src/**/*.html',
        dest: 'build/'
    },

     styles: {
         src: 'src/**/*.scss',
         dest: 'build/css/'
     },

    scripts: {
        src: 'src/**/*.js',
        dest: 'build/js/'
    },

    img: {
        src: 'src/img/**/*.*',
        dest: 'build/img/'
    },

    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/fonts/'
    },
};
//собираем стили
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())

        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}

//webpack
function scripts() {
    return gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig, compiler))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.scripts.dest))
}

//Просто переносим картинки
function images() {
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest))
}
//Просто переносим шрифты
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}

//Переносим html
function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
}

//Очистка
function clear() {
    return del(paths.root)
}

//Следим за исходниками
function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.img.src, images)
    gulp.watch(paths.fonts.src, fonts)
    gulp.watch(paths.html.src, html)
}

//Следим за сборкой и обновляем страницу в браузере
function server() {
    browserSync.init({
        server: paths.root,
        notify: false,
        open  : false,
        cors  : true,
        ui    :false,
    });

    browserSync.watch(paths.root + '/**/*.*', browserSync.reload)
}

exports.styles  = styles;
exports.scripts = scripts;
exports.images  = images;
exports.fonts   = fonts;
exports.html    = html;

//режим разработки
gulp.task('default', gulp.series (
    clear,
    gulp.parallel(styles, scripts, images, fonts, html),
    gulp.parallel(watch, server)
));

//сборка проекта в прод
gulp.task('build', gulp.series (
    clear,
    gulp.parallel(styles, scripts, images, fonts, html),
));
