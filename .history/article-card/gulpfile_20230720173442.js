const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
  return src("src/scss/style.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest("dist/css", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return src("src/js/script.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("dist/js", { sourcemaps: "." }));
}

// Browsersync Task for index.html
function serveIndexHtml() {
  browsersync.init({
    server: {
      baseDir: "./",
    },
  });
}

// Browsersync Task for index2.html
function serveIndex2Html() {
  browsersync.init({
    server: {
      baseDir: "./",
      index: "index2.html",
    },
    port: 3001, // Change to a different port, like 3001
  });
}

// Watch Task
function watchTask() {
  watch("*.html").on("change", browsersync.reload);
  watch(
    ["src/scss/**/*.scss", "src/js/**/*.js"],
    series(scssTask, jsTask, browsersync.reload)
  );
}

// Default Gulp task
exports.default = series(
  parallel(scssTask, jsTask),
  parallel(serveIndexHtml, serveIndex2Html),
  watchTask
);
