# rafasacaan.com

Personal site. Static HTML and CSS — no build step, no dependencies.

```
index.html   the whole page
style.css    layout and type
og.png       link preview image (1200x630)
CNAME        custom domain for GitHub Pages
```

Deployed from `main` via GitHub Pages.

## Editing

Open `index.html` and edit the text. The two columns are `.left` (bio and
projects) and `.right` (contact).

A project entry is a `<button class="project-name">` plus a `.panel` with the
matching `id`. The button's `aria-controls` points at the panel id, and the
panel's `.panel-close` carries the same id in `data-closes`. Adding a project
means duplicating that pair — the script picks it up with no other changes, and
keeps only one panel open at a time.

Remember to update the `Last updated` line at the bottom of the right column.
