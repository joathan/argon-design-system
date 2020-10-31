const gulp = require('gulp');

const conf = require('../conf/gulp.conf');

gulp.task('vendor', vendor);

function vendor() {
  return gulp
    .src(conf.path.src('./assets/vendor/**/**/**/**/*'))

    .pipe(gulp.dest(`${conf.path.tmp()}/assets/vendor`));
}
