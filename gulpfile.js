var gulp = require("gulp");
var webp = require("gulp-webp");
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var gulpSequence = require("gulp-sequence");
var htmlMin = require("gulp-htmlmin");
var clean = require("gulp-clean");
var minifyInline = require("gulp-minify-inline");
var gzip = require("gulp-gzip");
var connect = require("gulp-connect");
var browserify = require("browserify");
var babelify = require("babelify");
var autoprefixer = require("gulp-autoprefixer");
var source = require("vinyl-source-stream");
var vinylBuffer = require("vinyl-buffer");
var gzipStatic = require("connect-gzip-static");
// Load the JS files to arrays:
var MainJsList = ["js/dbhelper.js", "js/main.js"];
var RestaurantJsList = ["js/dbhelper.js", "js/restaurant_info.js"];

// Default gulp task (run "gulp")
gulp.task("default", ["prod:serve"]);

// Builing and serving prod files (run "gulp prod:serve")
gulp.task("prod:serve", gulpSequence("build", "serve"));

// Clean task (run "gulp clean")
gulp.task("clean", function() {
  return gulp
    .src("./build", {
      read: false
    })
    .pipe(clean());
});

// Prod build (run "gulp build")
gulp.task(
  "build",
  gulpSequence(
    "clean",
    "scripts:prod",
    "html:prod",
    "styles:prod",
    "copy:prod",
    "webp:prod",
    "gzip:prod"
  )
);

gulp.task("copy:prod", function() {
  return gulp
    .src([
      "!node_modules/**",
      "**/*.{png,jpg}",
      "sw.js",
      "manifest.json",
      "!gulpfile.js"
    ])
    .pipe(gulp.dest("./build"));
});

// HTML minification task (run "gulp html:prod")
gulp.task("html:prod", function() {
  return gulp
    .src(["!node_modules/**", "**/*.html"])
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(minifyInline())
    .pipe(gulp.dest("./build"));
});

// Style Prod (run "gulp styles:prod")
gulp.task("styles:prod", function() {
  gulp
    .src("css/styles.css")
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./build/css"));
});

// JS Prod (run "gulp scripts:prod")
gulp.task("scripts:prod", gulpSequence("script:index", "script:restaurant"));

gulp.task("script:index", function() {
  MainJsList.map(function(jsFile) {
    return browserify({
      entries: [jsFile]
    })
      .transform(
        babelify.configure({
          presets: ["env"]
        })
      )
      .bundle()
      .pipe(source("index.min.js"))
      .pipe(vinylBuffer())
      .pipe(
        sourcemaps.init({
          loadMaps: true
        })
      )
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./build/js"));
  });
});

gulp.task("script:restaurant", function() {
  RestaurantJsList.map(function(jsFile) {
    return browserify({
      entries: [jsFile]
    })
      .transform(
        babelify.configure({
          presets: ["env"]
        })
      )
      .bundle()
      .pipe(source("restaurant.min.js"))
      .pipe(vinylBuffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./build/js"));
  });
});

// gzip Prod (run "gulp gzip:prod")
gulp.task("gzip:prod", gulpSequence("gzip-html", "gzip-css", "gzip-js"));

gulp.task("gzip-html", function() {
  gulp
    .src("./build/**/*.html")
    .pipe(gzip())
    .pipe(gulp.dest("./build"));
});

gulp.task("gzip-css", function() {
  gulp
    .src("./build/css/**/*.min.css")
    .pipe(gzip())
    .pipe(gulp.dest("./build/css"));
});

gulp.task("gzip-js", function() {
  gulp
    .src("./build/js/**/*.js")
    .pipe(gzip())
    .pipe(gulp.dest("./build/js"));
});

// Conversion of *png and *jpg images to *webp
gulp.task("webp:prod", function() {
  gulp
    .src("img/*.jpg")
    .pipe(
      webp({
        method: 6
      })
    )
    .pipe(gulp.dest("./build/img/webp"));
});

// Serving to browser (run "gulp serve")
gulp.task("serve", function() {
  connect.server({
    root: "build/index.html",
    port: 8081,
    middleware: function() {
      return [
        gzipStatic(__dirname, {
          maxAge: 31536000000
        })
      ];
    }
  });
});
