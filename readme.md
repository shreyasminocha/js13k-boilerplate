# JS13kGames Boilerplate

Boilerplate for [JS13kGames](https://js13kgames.com) projects. Fork of [js13k-starter](https://github.com/aymanfarhat/js13k-starter).

This is what works for me; it might work for you, but it might not. Feel free to modify this to fit your needs.

## Features

- Gulp build process
    - `gulp-minify-html` for HTML minification
    - `gulp-clean-css` for CSS minification
    - `gulp-eslint` for JS minification
    - Zip generation
    - Warn on zip file size greater than 13kb.
- Gulp tests
    - [`htmllint`](https://htmllint.github.io) for HTML
    - [`stylelint`](https://stylelint.io) for CSS
    - [`eslint`](https://eslint.org) for JS

## Installation

Clone this project and change the remote.

```sh
git clone https://github.com/shreyasminocha/JS13kGames-boilerplate
git remote set-url origin [YOUR GITHUB REPO]
npm install # install devDependencies
```

## Usage

- `gulp build` / `npm run build`
    - Concatenate CSS files (`src/css/*.css`)
    - Concatenate JS files (`src/js/*.js`)
    - Minify HTML, CSS and JS to `dist/index.html`, `dist/style.min.css` and `dist/script.min.js` respectively
    - Fix links to CSS and JS files in `dist/index.html`
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

Since I've set up `.localhost` domains for hotel apps, I can access the game at `game.localhost`.

You might prefer running a server through gulp. Feel free to modify `gulpfile.js` in your clone to fit your needs.

## License

Licensed under the [MIT License](https://shreyas.mit-license.org).
