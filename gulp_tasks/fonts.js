const gulp = require('gulp');

const conf = require('../conf/gulp.conf');

gulp.task('fonts', fonts);

function fonts() {
  return gulp
    .src(conf.path.src('./assets/_fonts/**/**/**/**/*'))

    .pipe(gulp.dest(`${conf.path.tmp()}/assets/_fonts`));
}
