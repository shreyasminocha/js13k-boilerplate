# JS13kGames Boilerplate

Boilerplate for [JS13kGames](https://js13kgames.com) projects. Fork of [js13k-starter](https://github.com/aymanfarhat/js13k-starter).

This is what works for me; it might work for you, but it might not. Feel free to modify this to fit your needs.

## Features

- Gulp build process
    - [`gulp-minify-html`](https://npmjs.com/package/gulp-minify-html) for HTML minification
    - [`gulp-clean-css`](https://npmjs.com/package/gulp-clean-css) for CSS minification
    - [`gulp-terser`](https://npmjs.com/package/gulp-terser) for JS minification
    - `.zip` file generation
    - Warn on `.zip` file size greater than 13kb.
- Gulp tests
    - [`htmllint`](https://htmllint.github.io) for HTML
    - [`stylelint`](https://stylelint.io) for CSS
    - [`eslint`](https://eslint.org) for JS

## Installation

```sh
git clone https://github.com/shreyasminocha/js13k-boilerplate

mv js13k-boilerplate [NAME OF YOUR GAME]
cd [NAME OF YOUR GAME]

rm -rf .git
npm install # install devDependencies

rm readme.md
$EDITOR package.json # change package details
```

## Usage

- `gulp build` / `npm run build`
    - Concatenate CSS files (`src/css/*.css`)
    - Concatenate JS files (`src/js/*.js`)
    - Minify HTML, CSS and JS to `dist/index.html`, `dist/style.min.css` and `dist/script.min.js` respectively
    - Correct links to CSS and JS files in `dist/index.html`
    - Optimize images in `src/images` using [gifsicle](https://github.com/imagemin/imagemin-gifsicle), [jpegtran](https://github.com/imagemin/imagemin-jpegtran), [optipng](https://github.com/imagemin/imagemin-optipng), [svgo](https://github.com/imagemin/imagemin-svgo) and place them in `dist/images`.
    - Compress `dist` to `zip/game.zip`
    - Warn if `zip/game.zip` is larger than 13kb
- `gulp test` / `npm test`
    - Lint HTML, CSS, JS and fail on error.
- `gulp`
    - Run `gulp build`
    - Watch `src` for changes and build on change.

## Server

I prefer to run the game using [hotel](https://github.com/typicode/hotel). I've set hotel to run the game from `dist` using [`http-server`](https://www.npmjs.com/package/http-server).

```sh
cd dist
hotel add --name "game" 'http-server -p "$PORT" -c-1'
```

Since I've set up `.localhost` domains for hotel apps, I would be able to access the game at `game.localhost`.

You might prefer running a server through gulp. Feel free to modify `gulpfile.js` in your clone to fit your needs.

## License

Licensed under the [MIT License](https://shreyas.mit-license.org).
