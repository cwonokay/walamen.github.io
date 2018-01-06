const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// First Compile sass & Inject into browser
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest("src/css")) //we are telling it where to compile the sass files too they will get turned into css files and this is were we want them to go (this will create the css folder for us)
  .pipe(browserSync.stream());
});
gulp.task('browserSync', () => {
        browserSync.init({
            server: {
                baseDir: task.dir.base,
                middleware: [
                    webpackDevMiddleware(bundler, {
                        publicPath: webpackConfig.output.publicPath,
                        stats: 'errors-only'
                    })
                  ]
            },
            browser: 'chrome'
        });
    });
//Move JS Files to src/js
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js']) //js files we want to bring to our src folder
  .pipe(gulp.dest("src/js")) //bring it to our src folder and create a js folder
  .pipe(browserSync.stream());
});

//Servering our files in sass (watch Sass & Server)
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src" //will load src folder in the server
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload); //watching our html files , whenever an html file changes it will reload
});

//Move Fonts Folder to browserSync
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("src/fonts"));

});

//Move Fonts Awesome CSS to src/css
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("src/css"));

});

// This is out defualt gulp
gulp.task('default',['js', 'serve', 'fa', 'fonts']);
