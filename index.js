"use strict";

const toolbox = require("node-sass-magic-importer/dist/toolbox");

const isFile = ( path ) => ( new RegExp(/\.(c|sa|sc)ss$/, 'i') ).test( path );

const getSortPaths = ( paths ) => {
    return paths.filter( path => isFile(path) )
    	.map( path => ({ path, deep: path.split('/').length }) )
    	.sort( ( a, b ) => b['deep'] - a['deep'] )
    	.map( pathObj => pathObj.path );
};

const getContents = ( filePaths ) => filePaths && getSortPaths(filePaths).map((x) => `@import '${x}';`).join(`\n`);

const getImporterContents = ( filePaths ) => filePaths ? { contents: getContents( filePaths ) } : null;

const importer = function(url, prev) {
    const options = this.options; // node-sass options
    const includePaths = toolbox.buildIncludePaths(options.includePaths, prev);
    const filePaths = toolbox.resolveGlobUrl(url, includePaths);
    return getImporterContents(filePaths);
};

module.exports = () => importer;