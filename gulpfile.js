const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

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
    .pipe(reload({ stream: true }))
);

// browserify js
gulp.task('js', async () => {
  browserify('./src/js/main.js')
    .transform(babelify, {
      presets: ['@babel/preset-env'],
      plugins: [['@babel/plugin-proposal-class-properties']]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/js'))
    .pipe(reload({ stream: true }));
});

// concat css
gulp.task('css', () =>
  gulp
    .src(['./node_modules/bulma/css/bulma.min.css', './src/css/styles.css'])
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(reload({ stream: true }))
);

// browserSync
gulp.task(
  'serve',
  gulp.series('pug', 'js', 'css', () => {
    browserSync.init({
      server: {
        baseDir: './build/'
      }
    });
  })
);

// watch all tasks
gulp.task('default', () => {
  gulp.watch('./src/views/**/*.pug', gulp.series('pug'));
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
  gulp.watch('./src/css/styles.css', gulp.series('css'));
});
