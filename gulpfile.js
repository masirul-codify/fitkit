'use strict';

/* Include gulp and plugins */
var gulp = require('gulp'),
    webserver = require('browser-sync'),
    reload = webserver.reload,
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    // cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    beautify = require('gulp-beautify'),
    // minify = require('gulp-minify'),
    // concat = require('gulp-concat'),
    jsImport = require('gulp-js-import'),
    newer = require('gulp-newer'),
    rtlcss = require('gulp-rtlcss'),
    rename = require('gulp-rename'),
    touch = require('gulp-touch-cmd');

/* Paths */
var path = {
  dist: {
    html: 'app/dist/',
    js: 'app/dist/assets/js/',
    css: 'app/dist/assets/css/',
    style: 'app/dist/assets/css/',  
    img: 'app/dist/assets/img/',
    vendors: 'app/dist/assets/vendors/',
    fonts: 'app/dist/assets/fonts/',
    scss: 'app/dist/assets/scss/',
    php: 'app/dist/assets/php/'
  },
    src: {
      html: 'app/src/*.html',
      htminc  : 'app/src/partials/**/*.html',
      partials: 'app/src/partials/',
      js: 'app/src/assets/js/',
      vendorscss: 'app/src/assets/vendors/css/*.*',
      vendorsjs: 'app/src/assets/vendors/js/*.*',
      themejs: 'app/src/assets/js/theme.js',
      style: 'app/src/assets/scss/style.scss',  
      img: 'app/src/assets/img/**/*.*',
      fonts: 'app/src/assets/fonts/**/*.*',
      scss: 'app/src/assets/scss/**/*.*',
      php: 'app/src/assets/php/**/*.*'
  },
    watch: {
      html: 'app/src/*.html',
      htminc  : 'app/src/partials/**/*.html',
      partials: 'app/src/partials/',
      themejs: 'app/src/assets/js/theme.js',
      vendors: 'app/src/assets/vendors/**/*.*',
      css: ['app/src/assets/scss/**/*.scss'],
      img: 'app/src/assets/img/**/*.*',
      fonts: 'app/src/assets/fonts/**/*.*',
      scss: 'app/src/assets/scss/**/*.*',
      php: 'app/src/assets/php/**/*.*'
  },
    clean: './app/dist/*'
};


    
/* Server */
var config = {
  server: {
      baseDir: './app/dist'
  },
  notify: true
};

/* Tasks */

// Start the server
gulp.task('webserver', function () {
  webserver(config);
});

// Compile html

gulp.task('html:dist', function () {
  return gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(fileinclude({ basepath: path.src.partials }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(webserver.reload({ stream: true }));
});

// Compile theme styles
gulp.task('css:dist', function () {
  return gulp.src(path.src.style)
    .pipe(newer(path.dist.style))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 99 versions'],
    cascade: false}))
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulp.dest(path.dist.style))
    // .pipe(rtlcss()) 
    // .pipe(rename({ suffix: '-rtl' })) 
    .pipe(gulp.dest(path.dist.style))           // Output RTL stylesheets (rtl.css)
    // .pipe(touch())
    .pipe(webserver.stream({ reload: true }));
});

// Move fonts

gulp.task('fonts:dist', function () {
  return gulp.src(path.src.fonts)
    .pipe(newer(path.dist.fonts))
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('scss:dist', function () {
  return gulp.src(path.src.scss)
    .pipe(newer(path.dist.scss))
    .pipe(gulp.dest(path.dist.scss));
});
// Compile vendors styles

gulp.task('vendorscss:dist', function () {
  return gulp.src(path.src.vendorscss)
    .pipe(gulp.dest(path.dist.css))
    .pipe(touch())
    .pipe(webserver.reload({ stream: true }));
});

gulp.task('vendorsjs:dist', function () {
  return gulp.src(path.src.vendorsjs)
    .pipe(gulp.dest(path.dist.js))
    .pipe(touch())
    .pipe(webserver.reload({ stream: true }));
});

// Compile theme js

gulp.task('themejs:dist', function () {
  return gulp.src(path.src.themejs)
    .pipe(gulp.dest(path.dist.js))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(webserver.stream({ reload: true }));
});

// Move php

gulp.task('php:dist', function () {
  return gulp.src(path.src.php)
    .pipe(newer(path.dist.php))
    .pipe(gulp.dest(path.dist.php));
});

// Image processing
gulp.task('image:dist', function () {
  return gulp.src(path.src.img)
    .pipe(newer(path.dist.img))
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])))
    .pipe(gulp.dest(path.dist.img));
});

// Remove catalog 
gulp.task('clean:dist', function () {
  return del(path.clean);
});

// Clear cache
gulp.task('cache:clear', function () {
    cache.clearAll();
});


// Assembly Dist
gulp.task('build:dist',
    gulp.series('clean:dist',
      gulp.parallel(
      'html:dist',
      'css:dist',
      'vendorscss:dist',
      'vendorsjs:dist',
      'themejs:dist',
      'fonts:dist',
      'scss:dist',
      'php:dist',
      'image:dist'
      )
    )
);

// Launching tasks when files change
gulp.task('watch', function () {
  gulp.watch(path.watch.html, gulp.series('html:dist'));
  gulp.watch(path.watch.htminc, gulp.series('html:dist'));
  gulp.watch(path.watch.css, gulp.series('css:dist'));
  gulp.watch(path.watch.vendors, gulp.series('vendorscss:dist'));
  gulp.watch(path.watch.vendors, gulp.series('vendorsjs:dist'));
  gulp.watch(path.watch.themejs, gulp.series('themejs:dist'));
  gulp.watch(path.watch.img, gulp.series('image:dist'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:dist'));
  gulp.watch(path.watch.scss, gulp.series('scss:dist'));
  gulp.watch(path.watch.php, gulp.series('php:dist'));
});

// Serve
gulp.task('serve', gulp.series(
    gulp.parallel('webserver','watch')
));

// Dist
gulp.task('build:dist', gulp.series(
    'build:dist'
));

// Default tasks
gulp.task('default', gulp.series(
    'build:dist',
    gulp.parallel('webserver','watch')
));
