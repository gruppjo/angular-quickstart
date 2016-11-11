var gulp = require('gulp');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');

var builderConf = {
  normalize: true,
  minify: true,
  mangle: true,
  runtime: false,
  globalDefs: {
      DEBUG: false,
      ENV: 'production'
  }
};

gulp.task('static', function () {
  return gulp.src(['styles.css', 'app/**/*.{html,css}'])
    .pipe(gulp.dest('www/'));
})

gulp.task('build', ['static'], function buildSJS (done) {
  var builder = new Builder();
  builder.loadConfig('./systemjs.config.js')
  .then(function() {
    return builder
      .buildStatic(
        'app/main.js',
        'www/bundle.js',
        builderConf);
  })
  .then(function() {
    console.log('Build complete');
    done();
  })
  .catch(function (ex) {
    console.log('Build failed', ex);
    done('Build failed.');
  });
});
