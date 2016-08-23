var gulp = require("gulp"),
    bower = require("main-bower-files"),
    jasmine = require("gulp-jasmine"),
    jshint = require("gulp-jshint"),

    libraries = "public/lib/",
    srcFiles = ["public/src/**/*.js"],
    testFiles = ["test/*.js"];

gulp.task("lint", function() {
    return gulp.src(srcFiles).pipe(jshint()).pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("build", function() {
    return gulp.src(bower()).pipe(gulp.dest(libraries));
});

gulp.task("test", ["build"], function() {
    return gulp.src(testFiles).pipe(jasmine());
});

gulp.task("watch", function() {
    return gulp.watch(srcFiles.concat(testFiles), ["test"]);
});

gulp.task("default", ["build", "watch"]);
