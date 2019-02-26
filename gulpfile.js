var gulp = require('gulp');
var sass = require("gulp-sass");
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

function swallowError(error) {

    // If you want details of the error in the console
    console.log(error.toString())

    this.emit('end')
}

// Tâche pour compiler les .scss
gulp.task("sass", function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    return gulp.src("./js/**/*.js")
        .on('error', swallowError)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
});


gulp.task("watch:styles", function () {
    gulp.watch("scss/**/*.scss", gulp.series('sass'));
})

gulp.task("watch:code", function () {
    gulp.watch('js/**/*.js', gulp.series('scripts', browserSync.reload));
})

// Tâche pour "watcher" les fichiers en cours de modification
gulp.task("watch", gulp.parallel("watch:styles", "watch:code"));



// Tâche pour lancer la synchronisation avec le navigateur
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: '.'
        },
        open: false
    })
})