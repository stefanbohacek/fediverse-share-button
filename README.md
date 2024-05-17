# Fediverse Sharing Button

Let your site's visitors share your work with the fediverse!

## Features

- minimalist design inspired by Bootstrap
- shows a logo of supported fediverse software
- lets you share selected text
- remembers the last fediverse domain used
- free (as in fediverse) to use!

## How to use

1. Download the files in this repo.
2. Add the JavaScript code and CSS stylesheet to your page.

```html
<link rel="stylesheet" href="./fediverse-share-button/styles.min.css">
<script src="./fediverse-share-button/script.min.js" defer class="fsb-script">
```

Note that if you need to change the path at which the `fediverse-share-button` folder is uploaded

3. Add a sharing prompt to your page.

```html
<form class="fsb-prompt">
  <label>Share with the fediverse</label>
  <div class="input-group mb-3">
    <span class="input-group-text">https://</span>
    <input required
      type="text"
      name="fediverse-domain"
      placeholder="mastodon.social"
      class="fsb-domain form-control"
      aria-label="Amount (to the nearest dollar)">
    <button class="fsb-btn btn btn-outline-secondary"
      type="submit"
      id="button-addon2"><img src="./fediverse-share-button/icons/mastodon.svg"
        class="fsb-icon"></span>Share</button>
  </div>
  <p class="fsb-support-note fsb-d-none">This server does not support sharing. Please visit <a
      class="fsb-support-note-link"
      target="_blank"
      href=""></a>.</p>
</form>
```

## Development

After making changes to the JS and CSS files, make sure to minify them.

```sh
npm install terser -g
npm install minify -g
terser fediverse-share-button/script.js > fediverse-share-button/script.min.js
minify fediverse-share-button/styles.css > fediverse-share-button/styles.min.css
```

## To-do

- Better development workflow.
- Localization.

## Attributions

### Icons

- fediverse.wake.st
- flowbite.com/icons

### JS and CSS code

- https://getbootstrap.com
