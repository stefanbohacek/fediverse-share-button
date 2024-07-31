const { src, dest, watch, series, parallel } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const files = {
  scssPath: "fediverse-share-button/src/styles/*.scss",
  jsPath: "fediverse-share-button/src/scripts/**/*.js",
};

function scssTask() {
  return src(files.scssPath)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest("fediverse-share-button"));
}

function jsTask() {
  return (
    src(
      [
        "fediverse-share-button/src/scripts/modules/*.js",
        "fediverse-share-button/src/scripts/main.js"
      ]
    )
      .pipe(terser())
      .pipe(concat("script.js"))
      .pipe(rename({
        suffix: '.min'
      }))      
      .pipe(dest("fediverse-share-button"))
  );
}

function watchJS() {
  watch([files.jsPath], { interval: 1000, usePolling: true }, series(jsTask));
}

function watchCSS() {
  watch(
    [files.scssPath],
    { interval: 1000, usePolling: true },
    series(scssTask)
  );
}

exports.default = series(parallel(scssTask, jsTask));

exports.watch = series(parallel(scssTask, jsTask), parallel(watchJS, watchCSS));
