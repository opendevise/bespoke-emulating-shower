'use strict';

var pkg = require('./package.json'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  autoprefixer = require('gulp-autoprefixer'),
  browserify = require('gulp-browserify'),
  chmod = require('gulp-chmod'),
  connect = require('gulp-connect'),
  csso = require('gulp-csso'),
  del = require('del'),
  exec = require('gulp-exec'),
  ghpages = require('gh-pages'),
  jade = require('gulp-jade'),
  path = require('path'),
  plumber = require('gulp-plumber'), // plumber prevents pipe breaking caused by errors thrown by plugins
  rename = require('gulp-rename'),
  stylus = require('gulp-stylus'),
  through = require('through'),
  tidy = require('tidy-html5').tidy_html5,
  uglify = require('gulp-uglify'),
  isDist = process.argv.indexOf('deploy') >= 0;

gulp.task('js', ['clean:js'], function() {
  return gulp.src('src/scripts/main.js')
    .pipe(isDist ? through() : plumber())
    .pipe(browserify({ transform: ['debowerify'] }))
    //.pipe(isDist ? uglify() : through())
    .pipe(uglify())
    .pipe(rename('build.js'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('jade-html', ['clean:jade-html'], function() {
  return gulp.src('src/index.jade')
    .pipe(isDist ? through() : plumber())
    .pipe(jade({ pretty: true }))
    .pipe(rename('index-jade.html'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('asciidoc-html', ['clean:asciidoc-html'], function(done) {
  return gulp.src('')
    .pipe(isDist ? through() : plumber())
    // using stdin here would cause loss of context
    .pipe(exec('asciidoctor-bespoke -o - src/index.adoc', { pipeStdout: true }))
    .pipe(exec.reporter({ stdout: false }))
    .pipe(through(function(file) {
      var html = file.contents.toString();
      // NOTE based on tidy 4.9.26
      html = tidy(html, {
        'coerce-endtags': false,
        'drop-empty-elements': false,
        'fix-uri': false,
        'indent': false,
        'newline': 'LF',
        'preserve-entities': true,
        'quiet': true,
        'tidy-mark': false,
        'wrap': 0
      });
      html = html
        // strip extra newlines inside <pre> tags (fixed in 5.1)
        .replace(new RegExp('<pre([^>]*)>\\n([\\s\\S]*?)\\n</pre>', 'g'), '<pre$1>$2</pre>\n')
        // strip extra endline after <script> start tag
        //.replace(new RegExp('>\\n</script>', 'g'), '></script>')
        // add endine after script tags
        .replace(new RegExp('</script> *<', 'g'), '</script>\n<');
      file.contents = new Buffer(html);
      this.push(file);
    }))
    .pipe(rename('index.html'))
    .pipe(chmod(644))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src('src/styles/main.styl')
    .pipe(isDist ? through() : plumber())
    .pipe(stylus({
      'include css': true, // Allow CSS to be imported from node_modules
      paths: ['./node_modules']
    }))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(isDist ? csso() : through())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('dist/build'))
    .pipe(connect.reload());
});

gulp.task('images', ['clean:images'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

gulp.task('clean', function(done) {
  del('dist', done);
});

gulp.task('clean:jade-html', function(done) {
  del('dist/index-jade.html', done);
});

gulp.task('clean:asciidoc-html', function(done) {
  del('dist/index.html', done);
});

gulp.task('clean:js', function(done) {
  del('dist/build/build.js', done);
});

gulp.task('clean:css', function(done) {
  del('dist/build/build.css', done);
});

gulp.task('clean:images', function(done) {
  del('dist/images', done);
});

gulp.task('connect', ['build'], function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});

gulp.task('open', ['connect'], function (done) {
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.adoc', ['asciidoc-html']);
  gulp.watch('src/**/*.jade', ['jade-html']);
  gulp.watch('src/styles/**/*.styl', ['css']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch([
    'src/scripts/**/*.js',
    'bespoke-theme-*/dist/*.js' // Allow themes to be developed in parallel
  ], ['js']);
});

gulp.task('deploy', ['clean', 'build'], function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log }, done);
});

gulp.task('build', ['js', 'asciidoc-html', 'jade-html', 'css', 'images']);

gulp.task('serve', ['open', 'watch']);

gulp.task('default', ['build']);
