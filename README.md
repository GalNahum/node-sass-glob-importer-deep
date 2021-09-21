# node-sass-glob-importer-deep

Custom node-sass package importer that allow you to use deep glob syntax in [node-sass](https://www.npmjs.com/package/node-sass) imports.<br />

> ⚠ Please note, this importer is based on the [node-sass-glob-importer](https://www.npmjs.com/package/node-sass-glob-importer) npm package.
Both packages will check automatically for nested directions, the different is that this *deep* package will shift all nested `@import` above in the `sass` *imports* hierarchy, during that the node-sass-glob-importer will stay at the same hierarchy pattern.

**tree**
```bash
.
├── gulpfile.js
└── src
    ├── components
    │   ├── form
    │   │   ├── error
    │   │   │   └── _control.scss
    │   │   ├── _control.scss
    │   │   └── _group.scss
    │   ├── _card.scss
    │   └── _menu.scss
    ├── _config.scss
    ├── _functions.scss
    ├── _mixins.scss
    └── index.scss
```

**./src/index.scss**
```scss
// Import all files inside the `components` directory and subdirectories and their subdirectories children and so on...
@import "config";
@import "functions";
@import "mixins";
@import "components/**/*";
```

**E.G `index.scss` stream output before `sass` compilation**
```scss
@import "_config.scss";
@import "_functions.scss";
@import "_mixins.scss";
@import "components/form/error/_control.scss"; // ← Has been shifted above in the SASS imports stack hierarchy 
@import "components/form/_control.scss";
@import "components/form/_group.scss";
@import "components/_card.scss";
@import "components/_menu.scss";
```

## Usage

### gulp
```js
const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')( require('node-sass') );
const globImporterDeep = require('node-sass-glob-importer-deep');

const styles = () => {
    return src('./src/index.scss')
        .pipe(sass({
            importer: globImporterDeep()
        })
        .on('error', sass.logError))
        .pipe(dest('./dist/css'))
};

exports.default = series(styles);

```

### webpack

```js
// webpack.config.js
const globImporterDeep = require('node-sass-glob-importer-deep');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
              sassOptions: {
                importer: globImporterDeep()
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}
```

## See Also

- [node-sass-glob-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-glob-importer)

## Credits

- [Markus Oberlehner](https://markus.oberlehner.net/)

## License

MIT