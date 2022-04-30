const gulp = require('gulp');
const phantomjs = require('gulp-phantom');

const phSource = ['phantom/*.js'];
const testDir = 'test_data/';

async function phantom() {
  src(phSource)
    .pipe(phantomjs())
      .pipe(dest(testDir));
}

exports.phantom = phantom;
