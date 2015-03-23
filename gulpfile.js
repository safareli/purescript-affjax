"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var purescript = require("gulp-purescript");
var jsvalidate = require("gulp-jsvalidate");

gulp.task("make", function() {
  return gulp.src(["src/**/*.purs", "bower_components/purescript-*/src/**/*.purs"])
    .pipe(plumber())
    .pipe(purescript.pscMake());
});

gulp.task("make-test", function() {
  return gulp.src(["src/**/*.purs", "test/**/*.purs", "bower_components/purescript-*/src/**/*.purs"])
    .pipe(plumber())
    .pipe(purescript.psc({ main: "Test.Main", output: "test.js" }))
    .pipe(gulp.dest("tmp/"));
});

gulp.task("jsvalidate", ["make"], function () {
  return gulp.src("output/**/*.js")
    .pipe(plumber())
    .pipe(jsvalidate());
});

gulp.task("docs", function () {
  return gulp.src("src/**/*.purs")
    .pipe(plumber())
    .pipe(purescript.pscDocs())
    .pipe(gulp.dest("README.md"));
});

// gulp.task("default", ["jsvalidate", "docs"]);
gulp.task("default", ["make-test"]);
