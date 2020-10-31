const gulp = require('gulp');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const conf = require('../conf/gulp.conf');

gulp.task('styles', styles);

function styles() {
  return gulp
    .src(conf.path.src('./assets/scss/all.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', conf.errorHandler('Sass'))
    .pipe(
      postcss([
        postcssFlexbugsFixes,
        autoprefixer({
          overrideBrowserslist: [
            'Chrome >= 45',
            'Firefox ESR',
            'Edge >= 15',
            'Explorer >= 10',
            'iOS >= 9',
            'Safari >= 9',
            'Android >= 4.4',
            'Opera >= 30',
          ],
        }),
      ])
    )
    .on('error', conf.errorHandler('Autoprefixer'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${conf.path.tmp()}/assets/css`))
    .pipe(browserSync.stream());
}
