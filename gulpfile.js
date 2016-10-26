
const gulp = require('gulp');

// Include Our Plugins
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const jsonminify = require('gulp-jsonminify');
const autoprefixer = require('gulp-autoprefixer');
const minifyHTML = require('gulp-minify-html');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');

/* Cleans Directories ------------------------------------------------------- */
gulp.task('clean', () => del([
  'dist/**',
]));

/* HTML Minification -------------------------------------------------------- */
gulp.task('html', () => {
  const opts = {
    conditionals: true,
    spare: true,
  };
  return gulp.src('src/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'));
});

/* Compile Our Sass --------------------------------------------------------- */
gulp.task('sass', () =>
  (
    gulp.src('src/scss/lib/lib.scss')
      .pipe(sass())
      .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/css')),
    gulp.src('src/scss/app/app.scss')
      .pipe(sass())
      .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/css'))
  ));
/* Concatenate & Minify JS -------------------------------------------------- */
gulp.task('scripts', () => (
    gulp.src(['src/js/data/*.json'])
      .pipe(jsonminify())
      .pipe(gulp.dest('dist/js/data')),
    // gulp.src([
    //   // List of Library Files
    //   ''
    // ])
    //   .pipe(concat('lib.js'))
    //   .pipe(rename({ suffix: '.min' }))
    //   .pipe(gulp.dest('dist/js')),
    gulp.src('src/js/**/*.js')
      .pipe(concat('app.js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
  ));

/* Image Minification ------------------------------------------------------- */
gulp.task('images', () =>
  gulp.src('src/assets/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets')));


/* Spins up localhost ------------------------------------------------------- */
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      files: ['dist/**/*'],
    },
  });
  browserSync.watch(['dist/**/*']);
  /* Watch Files For Changes ------------------------------------------------ */
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('src/assets/**/*', gulp.series('images'));
  gulp.watch('src/**/*.html', gulp.series('html'));
});

/* Default Task ------------------------------------------------------------- */
gulp.task('default', gulp.series('clean', 'images',
  gulp.parallel('html', 'sass', 'scripts'), 'serve'));

/* Distribution Prep Task --------------------------------------------------- */
gulp.task('dist', gulp.series('clean', 'images',
  gulp.parallel('html', 'sass', 'scripts')));
