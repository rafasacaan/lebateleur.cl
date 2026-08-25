# lebateleur.cl

Personal site. Static HTML and CSS — no build step, no dependencies.

```
index.html          home page: bio, Taller, Experimentos y registros, right column
style.css            layout and type for the home page and project pages
updated.js            "Última actualización" reads the page's Last-Modified header
og.png, favicon*, apple-touch-icon.png   home page icons and link preview
404.html             custom 404, in the site's own type instead of GitHub's

yoescritor/index.html   a project page — its own URL, own og:image

notebook/index.html          "Notas técnicas" — the blog INDEX, lists posts
notebook/post.css             shared stylesheet for /notebook/ and /signals/
notebook/og-notebook.png      og:image for the index (not any single post)
notebook/an-architecture-playbook/index.html   post 001, its own URL
notebook/an-architecture-playbook/og-blog.png  that post's own og:image

signals/index.html      "Bloc de notas" — the other blog INDEX, empty for now
signals/og-signals.png

CNAME                 custom domain for GitHub Pages
robots.txt, sitemap.xml
```

Deployed from `main` via GitHub Pages, at **lebateleur.cl**. The GitHub repo
is `rafasacaan/lebateleur.cl`. `rafasacaan.com` is a domain the same person
owns but it no longer serves this site — its A records were removed on
purpose, so it resolves to nothing.

The site is in Spanish (`lang="es"` on every page). The one exception is the
first post's title, "An architecture playbook", which stayed in English while
its body is in Spanish — that's what the `.post-lang-tag` pill next to it
announces.

## Routes don't match their labels — that's known

Two sections were renamed after their folders already existed, and the URLs
were left alone so published links keep working:

| Label on screen  | Actual route |
|------------------|--------------|
| Bloc de notas    | `/signals/`  |
| Notas técnicas   | `/notebook/` |

Don't "fix" this by renaming the folders unless you also update every
canonical, `og:url`, the sitemap, and accept that
`/notebook/an-architecture-playbook/` breaks for anyone who linked to it.

## The names mean something — don't "fix" them either

- **le bateleur** — the site's name, the first card of the Marseille tarot
  (the juggler / the magician): all the tools on the table, nothing decided
  yet. Set in Corinthia, in `#FA2742`. It is the page's `<h1>`.
- **EN CONSTRUCCIÓN** — the status label under the wordmark. It's honest, not
  a placeholder to delete once things feel finished.
- **Taller** (not "Proyectos") — these aren't finished portfolio pieces,
  they're product hypotheses being built and tested in public.
- **Experimentos y registros** (left column, the big one) — ideas actually put
  to the test, *with evidence* of whether they moved the angle on something.
  This is the site's important output, and the bar is high. **It is
  deliberately empty**: nothing clears that bar yet. Don't fill it just to
  make the page look complete.
- **Bloc de notas** (right column) — short, unpolished notes written while
  building. Also empty for now.
- **Notas técnicas** (right column) — technical writing and research, without
  the evidence requirement. Lower bar than Experimentos y registros, which is
  why it sits in the quiet column and that one doesn't.

The hierarchy is the point: big and empty on the left, small and populated on
the right. A visitor should be able to tell which one costs more to earn.

Both right-column groups are labelled by an *italic tagline*, not a heading —
the headings were removed on purpose so that column stops competing with the
left one. Don't add `<h2>`s back.

## One typeface for reading, one for the name

Body text everywhere is Inter. The wordmark is Corinthia (script). Both come
from Google Fonts, so there are no font files in the repo and no licences to
review — a previous attempt used Fornire Light, which is free to *use* but
asks not to be redistributed, and self-hosting a webfont is exactly that.

`notebook/post.css`'s `--mono` is the one exception to Inter: real code blocks
(the ASCII folder tree in the architecture post) stay on the system monospace
stack, because aligning columns of text only works in a fixed-width font.

The home and project pages (`index.html`, `yoescritor/`, `404.html`) use
`style.css`; everything under `/notebook/` and `/signals/` uses
`notebook/post.css` — two files because the layouts differ (the
`.frame`/`.post` reading column, ported from regardless.cl's "memoria
técnica" template, vs. the two-column home), not because the type does.

Page background is `#F7F7F7` everywhere, set in both stylesheets.

## Both blogs are two levels

`/notebook/` and `/signals/` are **indexes** (`.postlist` — id, date, title,
link). Each post lives in its own folder with its own `index.html` and its own
`og-blog.png`. The index's own og image represents the section as a whole.
Post ids increment per blog (001, 002, …); the two blogs number independently.

## Editing the home page

Open `index.html`. The two columns are `.left` (bio, Taller, Experimentos y
registros) and `.right` (the two link groups + Última actualización). On
mobile (≤760px) `.right` is hidden and opens from the hamburger button at the
top right — that's the `#menuToggle` / `#rightPanel` pair and the inline
script at the bottom of the file.

Spacing utilities:
- `.para--after-heading` — 28px, the normal gap between a heading and its
  content.
- `.para--tight` / `.section-tagline` — 8px, for lines in the *same* visual
  block (tagline → links).
- `.section-tagline--first` — margin-top 0, for whatever opens `.right` so it
  lines up with the bio at the top of `.left`.
- `.section-tagline--gap` — 84px, the separation between the two right-column
  groups (it replaces the spacing the removed headings used to provide).

The footer sticks to the bottom of the viewport on short pages: `body` has
`min-height:100vh` and `.all` has `flex:1 0 auto`. Don't reintroduce a
`margin-top` on `body` — it would overflow the viewport by that amount.

A project is one line in `.projects` (under the Taller heading):
```html
<a class="project-name" href="/slug/">slug</a>
```
Add `<span class="project-tag">Próximamente</span>` next to it if it's not
live yet. The linked page is a standalone file at `/slug/index.html` — copy
`yoescritor/index.html` as a starting point.

## Adding a post

Pick the right blog first: does it show evidence that something moved the
angle? If yes it belongs in **Experimentos y registros** (home page, left
column). If it's research or technical notes, it goes in **Notas técnicas**
(`/notebook/`). If it's a short unpolished note, **Bloc de notas**
(`/signals/`).

1. Make a folder: `<blog>/<slug>/index.html` — copy
   `notebook/an-architecture-playbook/index.html` as a starting point, and
   give it its own `og-blog.png` (1200×630).
2. Add it to that blog's `.postlist`, at the top (newest first):
```html
<li>
  <p class="postlist-meta">
    <span class="post-id">002</span> &middot; <time datetime="2026-09-01">2026-09-01</time>
  </p>
  <a class="postlist-title" href="/notebook/<slug>/">Título del post</a>
</li>
```
3. If the index still shows `<p class="extracts-empty">Todavía no hay nada
   acá.</p>`, delete that line once there's a first entry.

For a post that belongs in **Experimentos y registros**, also add it to
`index.html`'s left column — the `<ul class="bloglist">` template is sitting
in an HTML comment there, ready to uncomment:
```html
<li>
  <span class="blog-id">001</span>
  <span class="blog-date">2026-09-01</span>
  <a href="/ruta-del-post/">Título del post</a>
</li>
```
and remove the `<p class="section-tagline para--after-heading">` that says
"Todavía no hay ninguno."

Ids appear in two places — the post's own `.post-meta` and its blog's index —
keep them in sync.

Don't update the `Última actualización` line by hand: `updated.js` sets it
from the page's own `Last-Modified` header on every deploy, formatted
`DD/MM/AAAA`. The text in the HTML is only a fallback for when JS doesn't run.

## Regenerating an og:image

They're plain 1200×630 PNGs — grey `#F7F7F7` background, black title, grey
kicker and URL, set in Helvetica Neue via Pillow. There's no script kept in
the repo; the ones used so far lived in a scratch directory. The layout is a
96px margin, kicker at y=170 (24px, `#767676`), title at y=230 (58px, black),
URL at the bottom (26px, `#767676`).

## Note on `/signals/`

It used to be "Signals around", a page of quoted paragraphs from other people
(`.extract` / `.extracts` classes, still defined in `notebook/post.css`). That
content was removed when the page became a blog; it's in git history at commit
`cc7386e` if it's ever wanted back. The unused `.extract*` CSS is still there
and can be deleted if that content never returns.
