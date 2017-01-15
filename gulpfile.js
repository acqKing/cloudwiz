var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var uglify = require('gulp-uglify');

var srcRoot = './src';
var dist = './dist';

gulp.task('html',function(){
    return gulp.src(srcRoot + '/html/**/*')
        .pipe($.plumber()) 
        .pipe(gulp.dest(dist + '/html/'))
});

/*合成雪碧图*/
gulp.task('sprite', function(){
    var spriteData = gulp.src( srcRoot + '/imgs/*.png')
                    .pipe($.spritesmith({
                        imgName:'sprite.png',
                        cssName:'sprite.css',
                        padding:10
                    }))
    spriteData.img.pipe(gulp.dest(dist + '/imgs/'));
    spriteData.css.pipe(gulp.dest(dist + '/css/'));
});

gulp.task('fonts', function(){
    return gulp.src(srcRoot + '/less/fonts/**.woff')
        .pipe(gulp.dest(dist + '/css/fonts'))
});

gulp.task('less2css',function(){
    return gulp.src(srcRoot + '/less/**/*.less')
        .pipe($.less({sourcemaps:true}))
        .pipe(gulp.dest(dist + '/css' ))
        .pipe($.filter('**/*.css'))
        .pipe(reload({ stream: true }))
});

gulp.task('scripts', function(){
    return gulp.src(srcRoot + '/js/**/*.js')
        .pipe($.plumber())
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js/'))
})

gulp.task('js-watch', ['scripts'], reload);

gulp.task('build',[
    'html',
    'less2css',
    'fonts',
    'scripts',
    'sprite'
]);

// 监听
gulp.task('watch', ['build'], function(){
    browserSync.init({
        server: {
            baseDir: dist 
        }     
    });
    gulp.watch(srcRoot + '/js/**/*.js', ['js-watch']);
    gulp.watch(srcRoot + '/less/**/*.less', ['less2css']);
    gulp.watch([srcRoot + '/html/*.html'],['html'])
    gulp.watch(dist + '/html/!*.html').on('change', reload);
});

gulp.task('defalut',['watch']);