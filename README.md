# rafasacaan.com

Personal site. Static HTML and CSS — no build step, no dependencies.

```
index.html          home page: bio, Atelier, Writing, Say hi, Personal notebook
style.css            layout and type for the home page and project pages
updated.js            "Last updated" reads the page's Last-Modified header
og.png, favicon*, apple-touch-icon.png   home page icons and link preview
404.html             custom 404, in the site's own type instead of GitHub's

yoescritor/index.html   a project page — its own URL, own og:image

notebook/index.html          the Notebook INDEX — lists posts, links to each one
notebook/post.css             shared stylesheet for every /notebook/ page and /signals/
notebook/og-notebook.png      og:image for the index (not any single post)
notebook/an-architecture-playbook/index.html   post 001, its own URL
notebook/an-architecture-playbook/og-blog.png  that post's own og:image

signals/index.html      running, append-only page of quoted paragraphs
signals/og-signals.png

CNAME                 custom domain for GitHub Pages
robots.txt, sitemap.xml
```

Deployed from `main` via GitHub Pages.

## The names mean something — don't "fix" them

The section headings are deliberate, not placeholder copy:

- **Atelier** (not "Projects") — these aren't finished portfolio pieces, they're
  product hypotheses being built and tested in public.
- **Writing** (left column, under Atelier) — a plain list of posts on the home
  page itself. Each title links **straight to the post**, never through
  `/notebook/`. This is the primary, portfolio-facing view of the writing.
- **Personal notebook** (right column, tagline "Raw parts & pieces") — groups
  **Signals around** and **Notebook**. The unpolished, behind-the-scenes
  corner, not the portfolio.
- **Notebook** (the link inside Personal notebook) — goes to `/notebook/`,
  the **index** page that lists every post. This is the secondary, "browse
  everything" view of the same posts Writing already lists.
- **Say hi** — the contact heading, deliberately informal.

Writing and Notebook are two different doors into the same posts — one
inline on the home page (a title takes you straight to the article), one a
dedicated index page (browse, then click through). Don't collapse them into
one link; that was tried and un-done on purpose.

## One typeface, one stylesheet each

Every page on the site renders in Inter (`'Neue Haas Unica','Inter',...` —
see the note in `style.css` about the paid fallback). The home page and
project pages (`index.html`, `yoescritor/`, `404.html`) use `style.css`;
every page under `/notebook/` and `/signals/` uses `notebook/post.css`
instead — two files because the layouts differ (the `.frame`/`.post` reading
column, ported from regardless.cl's "memoria técnica" template, vs. the
two-column home), not because the type does.

`notebook/post.css`'s `--mono` is the one exception: real code blocks (the
ASCII folder tree in the architecture post) stay on the system monospace
stack, because aligning columns of text only works in a fixed-width font —
everything else in that file, including what used to be `--read` (Lora) and
`--serif` (Fraunces), now resolves to the same Inter as the home page.

## Notebook is two levels, on purpose

`/notebook/` is an **index** (`.postlist` — id, date, title, link to the
post). Each post lives in its own folder, `/notebook/<slug>/`, with its own
`index.html` and its own `og-blog.png`. The index's `og-notebook.png` is
separate — it represents "Notebook" as a whole, not any one post.

## Editing the home page

Open `index.html`. The two columns are `.left` (bio, Atelier, Writing) and
`.right` (Say hi, Personal notebook, Last updated). Each section is an
`<h2 class="para para--heading">` followed by its content.

Spacing utilities on paragraphs right after a heading:
- `.para--after-heading` — 28px, the normal gap (a heading and its list).
- `.para--tight` / `.section-tagline` — 8px, for lines that are part of the
  *same* visual block (heading → tagline → links, under Say hi and under
  Personal notebook).
- `.para--first` — resets margin-top to 0, for whatever opens `.right` (today
  that's the "Say hi" heading, so it lines up with the bio at the top of
  `.left`).

A project is one line in `.projects` (under the Atelier heading):
```html
<a class="project-name" href="/slug/">slug</a>
```
Add `<span class="project-tag">Coming soon</span>` next to it if it's not
live yet. The linked page is a standalone file at `/slug/index.html` — copy
`yoescritor/index.html` as a starting point.

## Adding a post

1. Make a folder: `notebook/<slug>/index.html` — copy
   `notebook/an-architecture-playbook/index.html` as a starting point, and
   give it its own `og-blog.png` (1200×630).
2. Add it to `notebook/index.html`'s `.postlist`, at the top (newest first):
```html
<li>
  <p class="postlist-meta">
    <span class="post-id">002</span> &middot; <time datetime="2026-09-01">2026-09-01</time>
  </p>
  <a class="postlist-title" href="/notebook/<slug>/">Post title</a>
</li>
```
3. Add the same entry to `index.html`'s `.bloglist` (home page, left column,
   under the "Writing" heading) — link straight to the post, not to
   `/notebook/`:
```html
<li>
  <span class="blog-id">002</span>
  <span class="blog-date">2026-09-01</span>
  <a href="/notebook/<slug>/">Post title</a>
</li>
```
Ids increment by one per post (001, 002, …) and appear in three places — the
post's own `.post-meta`, the Notebook index, and the home page's Writing
list — keep all three in sync.

Remember to update the `Last updated` line — actually, don't: `updated.js`
sets it from the page's own `Last-Modified` header on every deploy. The text
in the HTML is only a fallback for when JS doesn't run.

## Adding a signal

Signals live in `signals/index.html`, inside `<div class="extracts">`, one
`<div class="extract">` per entry, **newest first** (add above the others,
not below). The CSS classes are still called `extract`/`extracts` — that's
the page's old name from earlier iterations; internal, does
not affect what's shown. Give each entry an `id` of its date so it can be
linked directly (`/signals/#2026-08-20`); if two land on the same day,
suffix the second one (`2026-08-20-2`) to keep ids unique.

```html
<div class="extract" id="2026-08-20">
  <p class="extract-date">2026-08-20</p>
  <blockquote class="extract-quote">
    <p>The quoted paragraph goes here.</p>
  </blockquote>
  <p class="extract-source">— <a href="https://example.com" target="_blank" rel="noopener">Author, "Title"</a></p>
  <p class="extract-note">Optional one-line thought of your own. Omit this
  paragraph entirely if you don't have one.</p>
</div>
```

If there's no source link yet, drop the `<a>` and leave plain text — don't
guess a URL.
