const gulp = require('gulp')
const ts = require('gulp-typescript')
const rimraf = require('rimraf')

const tsProject = ts.createProject('tsconfig.json')
const VIEW_FILES = ['./views/**/*']


function scripts() {
    const tsResult = tsProject.src()
        .pipe(tsProject())
    return tsResult.js
        .pipe(gulp.dest('dist'))
}

function setViews() {
    return gulp.src(VIEW_FILES)
        .pipe(gulp.dest('dist/views/ejs'))
}

function clean(cb) {
    rimraf('./dist', cb)
}

function build() {
    return scripts()
}

exports.clean = clean
exports.build = gulp.series(clean, gulp.parallel(build, setViews))
