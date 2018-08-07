const gulp = require('gulp');

const deleteFiles = require('gulp-rimraf');
const minifyHTML = require('gulp-minify-html');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replaceHTML = require('gulp-html-replace');
const ignore = require('gulp-ignore');
const zip = require('gulp-zip');
const checkFileSize = require('gulp-check-filesize');
const serve = require('gulp-connect');
const opn = require('opn');

const sourcePaths = {
    html: 'src/index.html',
    css: 'src/css/style.css',
    js: 'src/js/script.js'
};

const distPaths = {
    build: 'dist',
    minifiedCSS: 'style.min.css',
    minifiedJS: 'script.min.js'
};

const server = {
    dir: './src',
    port: '5000'
};

gulp.task('cleanDist', () => {
    return gulp.src('./dist/*', { read: false })
        .pipe(ignore('.gitignore'))
        .pipe(deleteFiles());
});

gulp.task('buildHTML', () => {
    return gulp.src(sourcePaths.html)
        .pipe(replaceHTML({
            css: distPaths.minifiedCSS,
            js: distPaths.minifiedJS
        }))
        .pipe(minifyHTML())
        .pipe(rename('index.html'))
        .pipe(gulp.dest(distPaths.build));
});

gulp.task('buildCSS', () => {
    return gulp.src(sourcePaths.css)
        .pipe(concat(distPaths.minifiedCSS))
        .pipe(minifyCSS())
        .pipe(gulp.dest(distPaths.build));
});

gulp.task('buildJS', () => {
    return gulp.src(sourcePaths.js)
        .pipe(concat(distPaths.minifiedJS))
        .pipe(minifyJS())
        .pipe(gulp.dest(distPaths.build));
});

gulp.task('zip', () => {
    return gulp.src('./dist/*')
        .pipe(zip('game.zip'))
        .pipe(gulp.dest('./zip'))
        .pipe(checkFileSize({ fileSizeLimit: 13312 }));
});

gulp.task('serve', () => {
    return gulp.src(server.dir)
        .pipe(serve({
            port: server.port,
            fallback: 'index.html'
        }));
});

gulp.task('openBrowser', () => {
    opn(`http://localhost:${server.port}`);
});

gulp.task('watch', () => {
    gulp.watch(sourcePaths.css, gulp.series('buildCSS', 'zip'));
    gulp.watch(sourcePaths.js, gulp.series('buildJS', 'zip'));
    gulp.watch(sourcePaths.html, gulp.series('buildHTML', 'zip'));
});

gulp.task('build', gulp.series(
    'cleanDist',
    'buildJS',
    'buildCSS',
    'buildHTML',
    'zip'
));

gulp.task('default', gulp.series(
    'build',
    'serve',
    'openBrowser',
    'watch'
));
