const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const htmlmin = require('gulp-htmlmin');
const jsmin = require('gulp-jsmin');
const del = require('del');
const sync = require("browser-sync").create();

// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Html
const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(jsmin())
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;


// Copy

const copy = (done) => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/favicon/*.ico",
    "source/img/**/*.{jpg,png,svg,webp}"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
  done();
}

exports.copy = copy;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

// Delete build before
const clean = () => {
  return del("build");
}
exports.clean = clean;




const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    styles,
    scripts,
    copy
  )
);

exports.build = build;

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    copy
  ),
  gulp.series(
    server,
    watcher,
    styles
  )
);

