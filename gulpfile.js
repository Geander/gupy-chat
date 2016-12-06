'use strict';

var gulp    = require('gulp');
var server  = require('gulp-develop-server');
var open    = require('gulp-open');
var mocha   = require('gulp-mocha');
var eslint  = require('gulp-eslint');

gulp.task('serve', ['run-api', 'run-app'], function() {
  var options = {
    uri: 'http://localhost:3000/canal-dev-gupy'
  };
  gulp.src(__filename)
  .pipe(open(options));
});

gulp.task('run-app', function() {
    server.listen( { path: 'app/server/app.js' }, function(){
      console.log('\n-----------------------------------------------------------------\n' +
                    '|  App Chat available in: http://localhost:3000/canal-dev-gupy  |\n' +
                    '-----------------------------------------------------------------\n');
    });
});

gulp.task('run-api', function() {
    server.listen( { path: 'api/api.js' }, function(){
      console.log('\n--------------------------------------------------\n' +
                    '|  Api Rest available in: http://localhost:3001  |\n' +
                    '--------------------------------------------------\n');
    });
});

gulp.task('test', ['lint'], function() {
    return gulp.src(['api/test/*.js'], {read: false})
        .pipe(mocha({reporter: 'nyan', timeout: 5000}))
        .once('end', function () {
            process.exit();
        });;
});

gulp.task('lint', function() {
  return gulp.src(['**/*.js','!node_modules/**']).pipe(eslint({
    'rules':{
        'quotes': [1, 'single'],
        'semi': [1, 'always']
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});
