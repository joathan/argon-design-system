const path = require('path');

const gulp = require('gulp');
const del = require('del');
const run = require('gulp-run');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('nunjucksFormatter', nunjucksFormatter);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function nunjucksFormatter() {
  return run(`prettier ${conf.paths.src}/app/**/**/*.njk --parser angular --write`).exec();
}
