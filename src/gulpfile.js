var gulp            = require('gulp');

//less-css
var browserSync     = require('browser-sync');
var less            = require('gulp-less');
var cssmin          = require('gulp-minify-css');
var autoprefixer    = require('gulp-autoprefixer');
var rename          = require('gulp-rename');

var uglify          = require('gulp-uglify');
var concat 			= require('gulp-concat');

var copy            = require('gulp-contrib-copy');

//images
var imageResize     = require('gulp-image-resize');
var imagemin        = require('gulp-imagemin');
var cache           = require('gulp-cache');

//cleaning
var clear           = require('del');

//Sequence
var runSequence = require('run-sequence');





// path
var PUBLIC_DIR = './../public/';
var path = {
    scripts :  'js/**/*.js' ,
    less    :  'less/main.less' ,
    css     :  'css/',
    fonts   :  'fonts/**/*.*',
    vendors :  'vendors/**/*.*',
    img     :  'img/**/*.*'
};

//dev

//Поднятие сервера dev
//
gulp.task('browserSync', function () {
   browserSync({
       server: {
           baseDir: './'
       }
   });
});
//
// gulp.task('less-copy', function(){
//     return gulp.src('src/less/**/*.less')
//         .pipe(copy())
//         .pipe(gulp.dest(PUBLIC_DIR  + 'src/less/'))
// });

// less compile 
gulp.task('less', function(){
    return gulp.src(path.css+'main.less')

        .pipe(less()) // используем gulp-less
        .pipe(autoprefixer({
            browsers:
                [
                    'Chrome > 20',
                    'Firefox > 20',
                    'Safari > 8',
                    'iOS > 7',
                    'ie > 8'
                ]
        }))
        .pipe(cssmin())
        .pipe(rename('main.css'))
        // .pipe(gulp.dest(PUBLIC_DIR  + path.css))
        .pipe(gulp.dest('css'));
        // .pipe(browserSync.reload({
        //     stream: true //обновление страницы после изменения файлов
        // }));
});

// js concatenation, minification 
// gulp.task('scripts', function(){
//     return gulp.src(['!src/js/index.min.js', path.scripts])
//         .pipe(concat('index.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(PUBLIC_DIR +'src/js/'))
//         .pipe(gulp.dest('src/js/'))
//         .pipe(browserSync.reload({
//             stream: true //обновление страницы после изменения файлов
//         }));
// });

// copying html to public

// gulp.task('html', function() {
//     return gulp.src('./index.html')
//         .pipe(copy())
//         .pipe(gulp.dest(PUBLIC_DIR));
// });
//
// // copying fonts to public
//
// gulp.task('fonts', function() {
//     return gulp.src(path.fonts)
//         .pipe(copy())
//         .pipe(gulp.dest(PUBLIC_DIR+'src/fonts'));
// });
//
// // copying bower libs to public
//
// gulp.task('bower', function() {
//     return gulp.src('bower_components/**/*.*')
//         .pipe(copy())
//         .pipe(gulp.dest(PUBLIC_DIR+'bower_components'));
// });

//
// //
// gulp.task('img:resize', function () {
//     return gulp.src('src/img/*.*')
//         .pipe(imageResize(
//             {
//                 width : 100,
//                 height : 100,
//                 crop : true,
//                 upscale : false,
//                 imageMagick: true
//             }
//         ))
//         .pipe(gulp.dest(PUBLIC_DIR));
// });

// optimization & copying img to public

// gulp.task('img', function() {
//     return gulp.src(path.img)
//         .pipe(imagemin())
//         .pipe(gulp.dest(PUBLIC_DIR+'src/img'));
// });

// deleting folder/files from public

// gulp.task('clean:public', function(){
//     clear(['./../public/*'],{force: true});
// });
//
// // cache clearing
//
// gulp.task('clean:cache', function(done){
//     return cache.clearAll(done);
// });


// dev
gulp.task(
    'default',

    function(callback){

        runSequence(
            // 'clean:cache',
            // 'img:resize',
            [
                'browserSync',
                'less',
                // 'scripts'
            ],
            callback
        );

// watchers
        gulp.watch(path.less, ['less']);
        // gulp.watch(path.scripts, ['scripts']);
        gulp.watch('*.html', browserSync.reload);
    }
);



// prod
gulp.task(
    'build',

    function(callback){

        runSequence(
            // 'clean:public',
            // 'clean:cache',
            //
            //     'less-copy',
                'less',
                // 'scripts',
                // 'fonts',
                // 'img',
                // 'html',
                // 'bower',
            callback
        );
    }
);
