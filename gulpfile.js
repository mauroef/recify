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
    .transform(babelify, { presets: ['@babel/preset-env'] })
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
    .pipe(gulp.dest('build/css'))
);

// browserSync
gulp.task(
  'serve',
  gulp.series('pug', 'js', () => {
    browserSync.init({
      server: {
        baseDir: './build/'
      }
    });
  })
);

gulp.watch('./src/views/**/*.pug', gulp.series('pug'));
gulp.watch('./src/js/main.js', gulp.series('js'));

// watch all tasks
gulp.task('dev', () => {
  gulp.watch('./src/views/**/*.pug', gulp.series('pug'));
  gulp.watch('./src/js/main.js', gulp.series('js'));
});
