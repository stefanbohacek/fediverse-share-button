![A screenshot of the fediverse sharing prompt, which consists of an input field for domain name and a button with the text "Share" preceded by a Mastodon logo](./images/fsb-640x120.png)
# Fediverse Sharing Button

Let your site's visitors share your work with the fediverse!

You can see a demo at [fediverse-share-button.stefanbohacek.dev](https://fediverse-share-button.stefanbohacek.dev/). For a list of supported platforms, [visit my blog](https://stefanbohacek.com/blog/making-fediverse-apps-for-everyone/#sharing-dialog).

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
<script src="./fediverse-share-button/script.min.js" defer class="fsb-script"></script>
```

Note that if you need to change the path at which the `fediverse-share-button` folder is uploaded

3. Add a sharing prompt to your page.

```html
<form class="fsb-prompt">
  <label>Share with the fediverse</label>
  <div class="fsb-input-group mb-3">
    <span class="fsb-input-group-text">https://</span>
    <input required
      type="text"
      name="fediverse-domain"
      placeholder="mastodon.social"
      class="fsb-input fsb-domain"
      aria-label="Amount (to the nearest dollar)">
    <button class="fsb-button"
      type="submit"><img src="./fediverse-share-button/icons/mastodon.svg"
        class="fsb-icon"></span>Share</button>
  </div>
  <p class="fsb-support-note fsb-d-none">This server does not support sharing. Please visit <a
      class="fsb-support-note-link"
      target="_blank"
      href=""></a>.</p>
</form>
```

## FAQ

**Q: How does this work?**

Some fediverse platforms let you [open a sharing prompt via a URL](https://stefanbohacek.com/blog/making-fediverse-apps-for-everyone/#sharing-dialog), much like many [corporate social media sites](https://stefanbohacek.com/blog/simple-sharing-buttons/#facebook).

My sharing button [detects the software](https://github.com/stefanbohacek/fediverse-info) running on the platform based on the provided URL, and shows a matching fediverse logo (courtesy of [Liaizon Wakest](https://fediverse.wake.st/)).

**Q: Does this button or the fediverse-info server collect any information?**

None at all. The [fediverse-info](https://github.com/stefanbohacek/fediverse-info) server is only needed to cache the software information for each domain as not to overwhelm the original server with too many requests.

The last domain used is stored in the [site visitor's browser](https://en.wikipedia.org/wiki/Web_storage) so that when they view another page, or visit the site again later, this information can be reused.

**Q: Are there any similar projects?**

Yes, see a list here: https://github.com/Uden-AI/fediverse-share#similar-projects-to-compare-to, including this project itself.

**Q: Is this really free to use?**

Yep. But if you do have any extra cash, see [stefanbohacek.com/support-my-work](https://stefanbohacek.com/support-my-work/).

**Q: Any way I can share feedback and suggestions?**

Yes, feel free to [open an issue](https://github.com/stefanbohacek/fediverse-share-button/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) on this repo, or find my contact information [on my website](https://stefanbohacek.com/contact/).

## To-do

- Add missing icons, see `icons/todo.txt`.
- Better development workflow.
- Localization.

## Development

After making changes to the JS and CSS files, make sure to minify them.

```sh
npm install terser -g
npm install minify -g
terser fediverse-share-button/script.js > fediverse-share-button/script.min.js
minify fediverse-share-button/styles.css > fediverse-share-button/styles.min.css
```

## Attributions

### Icons

- [fediverse.wake.st](https://fediverse.wake.st)
- [flowbite.com/icons](https://flowbite.com/icons)

### JS and CSS code

- https://getbootstrap.com
