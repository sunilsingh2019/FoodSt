var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('styles', async function () {
    gulp.src('./scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: false
                }
            }
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('serve', async function () {
    gulp.watch('./scss/*/*.scss', gulp.series('styles'));
});

gulp.task('default', gulp.series('styles', 'serve'));

gulp.task('pack-js', function () {
    return gulp.src(['./assets/js/jquery-3.3.1.min.js', './assets/js/bootstrap.bundle.min.js', './assets/js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('pack-css', function () {
    return gulp.src(['./assets/css/bootstrap.min.css', './assets/css/*.css'])
        .pipe(concat('bundle-min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: false
                }
            }
        }))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('bundle', gulp.series('pack-js', 'pack-css'));