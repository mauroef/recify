const gulp = require('gulp');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

// pug html
gulp.task('pug', () =>
  gulp
    .src('./src/views/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./build/'))
);

// babel & concat js
gulp.task('babel', () =>
  gulp
    .src('./src/js/api/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/js'))
);

// concat css files
gulp.task('pack-css', () =>
  gulp
    .src(['./node_modules/bulma/css/bulma.min.css', './src/css/styles.css'])
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('build/css'))
);

// watch all tasks
gulp.task('default', () => {
  gulp.watch('./src/views/**/*.pug', gulp.series('pug'));
  gulp.watch('./src/js/**/*.js', gulp.series('babel'));
});
