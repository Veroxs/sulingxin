var gulp = require("gulp"),
    less = require("gulp-less"),
    postcss = require('gulp-postcss'),
    cssurl = require('gulp-cssurl'),
    base64 = require('gulp-base64'),
    processors = [
        require('autoprefixer'),
        require('css-mqpacker'),
        require('postcss-pxtorem')({
            //rootValue: 33.75 * 3,// 1080/3 1080的设计稿 flexible.js
            rootValue: 3.375 * 100,// 1080/3 1080的设计稿 autoFize.js
            unitPrecision: 5,
            propWhiteList: [],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        }),
        require('cssnano')
    ],
    path = {
        dist: 'dist/',
        dev: 'dev/'
    }



/*速领薪*/
gulp.task('indexLess', function () {
    gulp.src(path.dev + "/less/app/*.less")
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(cssurl())
        .pipe(gulp.dest(path.dist + "/css/"))
        .pipe(base64({maxImageSize: 20 * 1024}))

    gulp.src(path.dev + "/img/**")
        .pipe(gulp.dest(path.dist + "/images/"))

    gulp.src(path.dev + "/less/img/**")
        .pipe(gulp.dest(path.dist + "/css/img/"))

    gulp.src(path.dev + "/js/**")
        .pipe(gulp.dest(path.dist + "/js/"))
  
})

gulp.task('dev', ['indexLess'], function () {
    gulp.src(path.dev + '/images/*')
        .pipe(gulp.dest(path.dist + "/css/app/images"))
    gulp.watch(path.dev + "/less/**/*.less", ['indexLess'])
});

gulp.task('base', function () {
    gulp.src(path.dev + "/less/base.less")
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(cssurl())
        .pipe(gulp.dest(path.dist + "/css/"))
        .pipe(base64({maxImageSize: 20 * 1024}))
})

gulp.task('default', ['indexLess', 'base'], function () {
    gulp.watch(path.dev + "/less/**/*.less", ['indexLess', 'base'])
});
