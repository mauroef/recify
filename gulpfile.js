const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

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
gulp.task('js', async () => {
  browserify('./src/js/main.js')
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/js'));
});

// concat css files
gulp.task('css', () =>
  gulp
    .src(['./node_modules/bulma/css/bulma.min.css', './src/css/styles.css'])
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('build/css'))
);

// watch all tasks
gulp.task('default', () => {
  gulp.watch('./src/views/**/*.pug', gulp.series('pug'));
  gulp.watch('./src/js/main.js', gulp.series('js'));
});
