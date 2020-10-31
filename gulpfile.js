const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build');
gulp.task('serve', gulp.series('nunjucksFormatter', 'nunjucks', 'fonts', 'images', 'vendor', 'styles', 'scripts', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch([conf.path.src('**/*.scss'), conf.path.src('**/*.css')], gulp.series('styles'));

  gulp.watch(conf.path.src('**/*.js'), gulp.series('scripts'));

  gulp.watch(conf.path.src('**/*.+(html|njk|nunjucks)'), gulp.series('nunjucksFormatter', 'nunjucks'));
  gulp.watch(conf.path.src('./app/content.json'), gulp.series('nunjucksFormatter', 'nunjucks'));

  gulp.watch(conf.path.src('**/*.+(png|jpg|gif|svg)'), gulp.series('images'));

  done();
}
