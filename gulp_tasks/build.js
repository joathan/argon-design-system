const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

const merge = require('merge-stream');

const conf = require('../conf/gulp.conf');

gulp.task('build', build);


function build() {
  const nunjucksDistTask = gulp
    .src([
      conf.path.src('./app/pages/**/*.+(html|njk|nunjucks)'),
      conf.path.src('./app/elements/**/*.+(html|njk|nunjucks)'),
    ])
    .pipe(
      nunjucksRender({
        path: [conf.path.src('./app/templates')],
        ext: '.html',
      })
    )
    .pipe(gulp.dest(`${conf.path.dist()}`));

  const fontsDistTask = gulp
    .src(conf.path.src('./assets/_fonts/**/**/**/**/*'))
    .pipe(gulp.dest(`${conf.path.dist()}/assets/_fonts`));

  const imagesDistTask = gulp
    .src(conf.path.src('./assets/img/**/**/**/**/*'))
    .pipe(gulp.dest(`${conf.path.dist()}/assets/img`));

  const vendorDistTask = gulp
    .src(conf.path.src('./assets/vendor/**/**/**/**/*'))
    .pipe(gulp.dest(`${conf.path.dist()}/assets/vendor`));

  const stylesDistTask = gulp
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
    .pipe(gulp.dest(`${conf.path.dist()}/assets/css`));

  const scriptsDistTask = gulp
    .src(conf.path.src('./assets/js/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())

    .pipe(babel())
    .pipe(gulp.dest(`${conf.path.dist()}/assets/js`));

  return merge(
    nunjucksDistTask,
    fontsDistTask,
    imagesDistTask,
    vendorDistTask,
    stylesDistTask,
    scriptsDistTask
  );
}
