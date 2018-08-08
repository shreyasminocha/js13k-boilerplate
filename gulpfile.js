const gulp = require('gulp');

const lintHTML = require('gulp-htmllint');
const lintCSS = require('gulp-stylelint');
const lintJS = require('gulp-eslint');
const deleteFiles = require('gulp-rimraf');
const minifyHTML = require('gulp-minify-html');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replaceHTML = require('gulp-html-replace');
const zip = require('gulp-zip');
const checkFileSize = require('gulp-check-filesize');

const srcPaths = {
    html: 'src/index.html',
    css: 'src/css/*.css',
    js: 'src/js/*.js'
};

const distPaths = {
    dir: 'dist',
    css: 'style.min.css',
    js: 'script.min.js'
};

gulp.task('lintHTML', () => {
    return gulp.src('src/index.html')
        .pipe(lintHTML());
});

gulp.task('lintCSS', () => {
    return gulp.src(srcPaths.css)
        .pipe(lintCSS({
            reporters: [{ formatter: 'string', console: true }]
        }));
});

gulp.task('lintJS', () => {
    return gulp.src(srcPaths.js)
        .pipe(lintJS())
        .pipe(lintJS.failAfterError());
});

gulp.task('cleanDist', () => {
    return gulp.src('dist/*', { read: false })
        .pipe(deleteFiles());
});

gulp.task('buildHTML', () => {
    return gulp.src(srcPaths.html)
        .pipe(replaceHTML({
            css: distPaths.css,
            js: distPaths.js
        }))
        .pipe(minifyHTML())
        .pipe(rename('index.html'))
        .pipe(gulp.dest(distPaths.dir));
});

gulp.task('buildCSS', () => {
    return gulp.src(srcPaths.css)
        .pipe(concat(distPaths.css))
        .pipe(minifyCSS())
        .pipe(gulp.dest(distPaths.dir));
});

gulp.task('buildJS', () => {
    return gulp.src(srcPaths.js)
        .pipe(concat(distPaths.js))
        .pipe(minifyJS())
        .pipe(gulp.dest(distPaths.dir));
});

gulp.task('zip', () => {
    const thirteenKb = 13 * 1024;

    gulp.src('zip/*')
        .pipe(deleteFiles());

    return gulp.src('dist/*')
        .pipe(zip('game.zip'))
        .pipe(gulp.dest('zip'))
        .pipe(checkFileSize({ fileSizeLimit: thirteenKb }));
});

gulp.task('build', gulp.series(
    'cleanDist',
    gulp.parallel('buildHTML', 'buildCSS', 'buildJS'),
    'zip'
));

gulp.task('watch', () => {
    gulp.watch(srcPaths.html, gulp.series('buildHTML', 'zip'));
    gulp.watch(srcPaths.css, gulp.series('buildCSS', 'zip'));
    gulp.watch(srcPaths.js, gulp.series('buildJS', 'zip'));
});

gulp.task('test', gulp.parallel('lintHTML', 'lintCSS', 'lintJS'));

gulp.task('default', gulp.series(
    'build',
    'watch'
));
