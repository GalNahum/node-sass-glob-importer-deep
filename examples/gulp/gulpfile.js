"use strict";

const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const del = require('del');
const globImporterDeep = require('node-sass-glob-importer-deep');

const clean = () => del(['./dist']);

const styles = () => {
    return src('./sass/**/*.scss')
        .pipe(sass({
            importer: globImporterDeep()
        })
        .on('error', sass.logError))
        .pipe(dest('./dist/css'));
};

exports.default = series(clean, styles);