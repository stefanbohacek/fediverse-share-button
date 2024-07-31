const { src, dest, watch, series, parallel } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
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
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({
      suffix: '.min'
    }))    
    .pipe(dest("fediverse-share-button", { sourcemaps: "." }));
}

function jsTask() {
  return src(
    [
      files.jsPath,
      //,'!' + 'includes/js/jquery.min.js',
    ],
    { sourcemaps: true }
  )
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest("fediverse-share-button", { sourcemaps: "." }));
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

exports.default = series(
  parallel(scssTask, jsTask)
);

exports.watch = series(
  parallel(scssTask, jsTask),
  parallel(watchJS, watchCSS)
);
