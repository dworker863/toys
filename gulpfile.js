const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;

function html() {
  return gulp
    .src('assets/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest('dist'));
}

function styles() {
  return gulp
    .src([
      'assets/libs/owlCarousel/dist/assets/owl.carousel.min.css',
      './assets/scss/**/*.scss',
    ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      './assets/js/common.js',
      'assets/libs/owlCarousel/dist/owl.carousel.min.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: 'assets',
    },
  });

  gulp.watch('assets/**/*.html').on('change', browserSync.reload);
  gulp.watch('assets/scss/**/*.scss', gulp.series(styles));
  gulp.watch('assets/js/common.js', gulp.series(scripts));
}

function clear() {
  return del('dist');
}

function build(done) {
  gulp.src('assets/css/styles.min.css').pipe(gulp.dest('dist/css'));

  gulp.src('assets/js/scripts.min.js').pipe(gulp.dest('dist/js'));

  gulp.src('assets/fonts/**').pipe(gulp.dest('dist/fonts'));

  gulp.src('assets/images/**').pipe(gulp.dest('dist/images'));

  done();
}

exports.default = gulp.series(gulp.parallel(styles, scripts), watch);
exports.build = gulp.series(gulp.parallel(styles, scripts), clear, html, build);
