const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync');
const fs = require('fs');
const data = require('gulp-data');

const conf = require('../conf/gulp.conf');

gulp.task('nunjucks', nunjucks);

function nunjucks() {
  return gulp
    .src([conf.path.src('./app/pages/**/*.+(html|njk|nunjucks)'), conf.path.src('./app/elements/**/*.+(html|njk|nunjucks)')])
    .pipe(
      data(function() {
        return JSON.parse(fs.readFileSync(conf.path.src('./app/content.json')));
      })
    )
    .pipe(
      nunjucksRender({
        path: [conf.path.src('./app/templates')],
        ext: '.html',
      })
    )

    .pipe(gulp.dest(`${conf.path.tmp()}`))
    .pipe(browserSync.stream());
}
