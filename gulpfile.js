var gulp =require('gulp');
var rename =require('gulp-rename');
var scss =require('gulp-sass');
var uglify=require('gulp-uglify');
var autoprefixer =require('gulp-autoprefixer');
var sourcemaps =require('gulp-sourcemaps');
var browserify=require('browserify');
var babelify=require('babelify');
var source=require('vinyl-source-stream');
var buffer=require('vinyl-buffer');
var browserSync=require('browser-sync');
var reload= browserSync.reload;
var image = require('gulp-image');
var newer = require('gulp-newer');


var jssrc='script.js'

var configuration = {
    paths: {
        src: {
            css: 'src/public/css/*.css',
            scss:'src/public/scss/*.scss',
            font:'src/public/fonts/**/*.*',
            jspath:'src/public/js/',
            images:'src/public/images/*.*'

        },
        watch:{
            css: 'src/public/css/*.css',
            font:'src/public/fonts/**/*.*',
            scss:'src/public/scss/**/*.scss',
            js:'src/public/js/*.js',
            jsStatic:'src/public/js/vendorJs/*.js',
            images:'src/public/images/*.*'
        },
        dist: './dist/public/vendor',
        distImage:'./dist/public/',
    }
};

var jsFile=[jssrc];

// function browser_sync(done){
//     browserSync.init({
//         server:{
//             baseDir:"./"
//         }
//     });
//     done();
// }
function font(done){
    gulp.src(configuration.paths.src.font)
        .pipe(gulp.dest(configuration.paths.dist +'/fonts/'))
        done();
    };

// // Gulp task to concatenate our css files
function css(done){
    gulp.src(configuration.paths.src.css)
        .pipe(gulp.dest(configuration.paths.dist +'/css/'))
        done();
    };
 // Gulp task to concatenate our scss files
 function sass(done){
    gulp.src(configuration.paths.src.scss)
       .pipe(sourcemaps.init())
        .pipe(scss({
            errorLogToConsole:true,
            outputStyle:"compressed"
        }))
        .on('error',console.error.bind(console))
        .pipe(autoprefixer())
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(configuration.paths.dist +'/css/'))
        // .pipe(browserSync.stream())
        done();
 }

  function images(done) {
  gulp.src(configuration.paths.src.images)
    .pipe(newer(configuration.paths.distImage + "/images/"))
    .pipe(image())
    .pipe(gulp.dest(configuration.paths.distImage + "/images/"));
    done();
};
 

function js(done){
    jsFile.map(entry=>{
        return browserify({
            entries:[configuration.paths.src.jspath + entry]
        })
        .transform(babelify,{presets:['@babel/preset-env']})
        .bundle()
        .pipe(source(entry))
        .pipe(rename({extname:'.min.js'}))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(configuration.paths.dist +'/js/'))
        // .pipe(browserSync.stream())
    })
done();
};
function jsStatic(done){
    gulp.src(configuration.paths.src.jspath + '/vendorJs/*.*')
     .pipe(gulp.dest(configuration.paths.dist +'/js/'))
done();
};
function NightsWatch(done){
    gulp.watch(configuration.paths.watch.css, css);
    // gulp.watch(configuration.paths.watch.font, font);
    gulp.watch(configuration.paths.watch.scss, sass);
    gulp.watch(configuration.paths.watch.images, images);
    gulp.watch(configuration.paths.watch.js, js);
    gulp.watch(configuration.paths.watch.jsStatic, jsStatic);
    done();
}
gulp.task("css",css);
gulp.task('font',font);
gulp.task("sass",scss);
gulp.task("js",js);
gulp.task("images",images);
gulp.task('jsStatic',jsStatic)
gulp.task('default',gulp.series(sass,css,font,js,jsStatic,images));
gulp.task('watch',gulp.series('default',NightsWatch));





//  gulp.task('watch',['default','browser-sync'],()=>{
//         gulp.watch(configuration.paths.watch.scss,['scss',reload]);
//         gulp.watch(configuration.paths.watch.js,['js',reload]);
//  });
exports.default = gulp.series('default',NightsWatch);