const gulp = require('gulp');

const conf = require('../conf/gulp.conf');

gulp.task('images', images);

function images() {
  return gulp
    .src(conf.path.src('./assets/img/**/**/**/**/*'))

    .pipe(gulp.dest(`${conf.path.tmp()}/assets/img`));
}
