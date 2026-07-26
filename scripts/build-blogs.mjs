// Converts the blog .docx sources into styled static pages under public/blog/.
// Run: node scripts/build-blogs.mjs
import fs from 'node:fs'
import path from 'node:path'
import mammoth from 'mammoth'

const SRC_DIR = 'C:/Users/Shrey Chauhan/OneDrive - Leaping Frog Solutions Pvt. Ltd/Documents/Blogs'
const OUT_DIR = path.resolve('public/blog')

// `abs` = full path override for a source that lives outside SRC_DIR.
// grad = CSS gradient for the tile icon; glyph = key into GLYPHS below.
const BLOGS = [
  {
    abs: 'C:/Users/Shrey Chauhan/Downloads/BC_JSON_Payload_Formats_Blog.docx',
    slug: 'bc-json-payload-formats',
    title: 'Converting BC Table Data into 14 API-Ready Payload Formats',
    date: 'July 2026',
    excerpt:
      'One Customer record → JSON, Base64, byte arrays, hex, multipart, zip, hashes, HMAC signatures, and AES encryption — all SaaS-safe with no DotNet.',
    tags: ['AL', 'API', 'JSON', 'Integration'],
    grad: 'linear-gradient(135deg,#6366f1,#2dd4bf)',
    glyph: 'braces',
  },
  {
    file: 'TryFunction Blog.docx',
    slug: 'understanding-tryfunction-in-al',
    title: 'Understanding [TryFunction] in AL for Business Central',
    date: 'June 2026',
    excerpt:
      'How the [TryFunction] attribute really works — graceful error handling in AL, when to use it, common pitfalls, and patterns for reliable code.',
    tags: ['AL', 'Error Handling'],
    grad: 'linear-gradient(135deg,#f43f5e,#fb923c)',
    glyph: 'shield',
  },
  {
    file: 'Building Robust Custom APIs in Business Central.docx',
    slug: 'building-robust-custom-apis',
    title: 'Building Robust Custom APIs in Business Central',
    date: 'March 2026',
    excerpt:
      'Designing custom API pages and codeunit-based endpoints in AL — clean contracts, validation, and integration-ready responses.',
    tags: ['AL', 'API', 'Integration'],
    grad: 'linear-gradient(135deg,#8b5cf6,#e879f9)',
    glyph: 'link',
  },
  {
    file: 'Mastering RecordRef & FieldRef.docx',
    slug: 'mastering-recordref-fieldref',
    title: 'Mastering RecordRef & FieldRef in Business Central',
    date: 'January 2026',
    excerpt:
      'Dynamic data access with RecordRef and FieldRef — generic validation, rule-based processing, and record comparison that works across any table.',
    tags: ['AL', 'RecordRef'],
    grad: 'linear-gradient(135deg,#2dd4bf,#0ea5e9)',
    glyph: 'database',
  },
  {
    file: 'Automating Job Queue Monitoring in Business Central.docx',
    slug: 'automating-job-queue-monitoring',
    title: 'Automating Job Queue Monitoring in Business Central',
    date: 'December 2025',
    excerpt:
      'AL code, assisted setup, and scheduling to keep job queues healthy — automatic restarts and email alerts when background jobs fail.',
    tags: ['AL', 'Job Queue', 'Automation'],
    grad: 'linear-gradient(135deg,#f59e0b,#f43f5e)',
    glyph: 'clock',
  },
  {
    file: 'Migrating from C-AL to AL Using Txt2AL.docx',
    slug: 'migrating-cal-to-al-txt2al',
    title: 'Migrating from C-AL to AL Using Txt2AL',
    date: 'October 2025',
    excerpt:
      'Converting classic NAV C/AL objects into AL extensions with the Txt2AL tool — export, conversion, and post-conversion cleanup workflow.',
    tags: ['C/AL', 'Txt2AL', 'Migration'],
    grad: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    glyph: 'filecode',
  },
  {
    file: 'Boost Your AL Coding Productivity with AI Extensions.docx',
    slug: 'boost-al-productivity-with-ai-extensions',
    title: 'Boost Your AL Coding Productivity with AI Extensions',
    date: 'September 2025',
    excerpt:
      'Using GitHub Copilot and Gemini Code Assist in VS Code to speed up AL development — setup, prompting, and practical wins.',
    tags: ['AI', 'Copilot', 'VS Code'],
    grad: 'linear-gradient(135deg,#e879f9,#6366f1)',
    glyph: 'sparkles',
  },
  {
    file: 'Amount in Words.docx',
    slug: 'amount-in-words',
    title: 'Amount in Words in Microsoft Dynamics 365 Business Central',
    date: 'July 2025',
    excerpt:
      'Converting amounts to words on invoices, payments, and reports — the standard Check Report approach and custom AL implementations.',
    tags: ['AL', 'Reports'],
    grad: 'linear-gradient(135deg,#2dd4bf,#10b981)',
    glyph: 'hash',
  },
  {
    file: 'Upgrading Customized C-AL to Business Central.docx',
    slug: 'upgrading-customized-cal-to-business-central',
    title: 'Upgrading Customized C-AL to Business Central',
    date: 'July 2025',
    excerpt:
      'The end-to-end upgrade path for customized C/AL solutions to modern Business Central — objects, data, and post-upgrade checks.',
    tags: ['Upgrade', 'C/AL'],
    grad: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    glyph: 'rocket',
  },
  {
    file: 'How to Remove Warning of Document Attachment FactBox.docx',
    slug: 'remove-doc-attachment-factbox-warning',
    title: 'How to Remove the Warning of Document Attachment FactBox',
    date: 'June 2025',
    excerpt:
      'Fixing the Document Attachment FactBox warning when wiring it to custom tables — event subscribers and a clean integration pattern.',
    tags: ['AL', 'FactBox'],
    grad: 'linear-gradient(135deg,#f59e0b,#f97316)',
    glyph: 'alert',
  },
  {
    file: 'How to Create a FactBox.docx',
    slug: 'how-to-create-a-factbox',
    title: 'How to Create a FactBox in Business Central',
    date: 'June 2025',
    excerpt:
      'Building FactBoxes from scratch — page parts, wiring them to list and card pages, and surfacing related data where users need it.',
    tags: ['AL', 'UI'],
    grad: 'linear-gradient(135deg,#0ea5e9,#2dd4bf)',
    glyph: 'panel',
  },
  {
    file: 'How to Change Subject, Body and Attachment Name while Sending E-Mail.docx',
    slug: 'customize-email-subject-body-attachment',
    title: 'How to Change Subject, Body and Attachment Name while Sending E-Mail',
    date: 'November 2024',
    excerpt:
      'Customizing outgoing document emails in Business Central — dynamic subjects, bodies, and attachment file names via codeunit extensions.',
    tags: ['AL', 'Email'],
    grad: 'linear-gradient(135deg,#8b5cf6,#0ea5e9)',
    glyph: 'mail',
  },
]

// Minimal inline SVG glyphs (stroke-based, currentColor) for the index tiles.
const GLYPHS = {
  braces:
    '<path d="M7 4H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1"/><path d="M17 4h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1"/>',
  shield: '<path d="M12 2l8 3.5v5.5c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5.5z"/><path d="M9.5 12l2 2 3.5-4"/>',
  link:
    '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
  database:
    '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  filecode:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 12l-2 2 2 2M14 12l2 2-2 2"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>',
  rocket:
    '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 8-11c3 0 5 2 5 5a22 22 0 0 1-11 8z"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function cleanLabel(text) {
  // strip emoji / decorative symbols for the TOC label, keep numbers and words
  return text
    .replace(/[\u{1F000}-\u{1FFFF}\u2190-\u21FF\u2600-\u27BF\u2B00-\u2BFF\uFE0F]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Post-processes mammoth's HTML: turn single-cell code tables into <pre> blocks,
// give headings anchor ids, and collect them for the "In this Article" index.
function enhance(html) {
  // 1. Single-cell tables (mammoth renders AL code snippets this way) -> code blocks
  html = html.replace(/<table>\s*<tr>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>\s*<\/table>/g, (m, cell) => {
    if (/<\/td>/.test(cell)) return m // more than one cell -> a real data table, leave it
    const lines = [...cell.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((x) =>
      x[1].replace(/<\/?(strong|em|span|b|i|br)[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+$/, ''),
    )
    const code = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
    return `<pre><code>${code}</code></pre>`
  })

  // 2. Heading ids + collect for TOC
  const headings = []
  html = html.replace(/<h([12])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
    const raw = inner.replace(/<[^>]+>/g, '').trim()
    const label = cleanLabel(raw)
    if (!label) return m
    const id = slugify(raw)
    headings.push({ label, id, lvl: Number(lvl) })
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`
  })

  return { html, headings }
}

function tocHtml(allHeadings) {
  // Prefer top-level sections. If a doc has a real h1 outline, index only those;
  // otherwise fall back to all headings. A TOC over 20 items means the source is
  // too flat to index usefully, so skip it rather than dump a wall of links.
  const h1s = allHeadings.filter((h) => h.lvl === 1)
  const headings = h1s.length >= 3 ? h1s : allHeadings
  if (headings.length < 3 || headings.length > 20) return ''
  const items = headings.map((h) => `      <li><a href="#${h.id}">${h.label}</a></li>`).join('\n')
  return `<nav class="toc" aria-label="In this article">
  <p class="toc-title"><span class="toc-dot"></span>In this Article</p>
    <ol>
${items}
    </ol>
  </nav>`
}

const template = (meta, toc, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${meta.title} | Shrey Chauhan</title>
<meta name="description" content="${meta.title} — a Business Central development blog by Shrey Chauhan." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    background: #060810;
    color: #cbd5e1;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.75;
  }
  .backdrop {
    position: fixed; inset: 0; pointer-events: none; opacity: 0.025;
    background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .glowbar { position: fixed; top: -240px; left: 50%; transform: translateX(-50%);
    width: 720px; height: 420px; border-radius: 9999px; pointer-events: none;
    background: rgba(79, 70, 229, 0.16); filter: blur(140px); }
  .wrap { position: relative; max-width: 820px; margin: 0 auto; padding: 48px 22px 80px; }
  .back {
    display: inline-flex; align-items: center; gap: 6px;
    color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 600;
    border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
    padding: 8px 16px; border-radius: 12px; transition: all .2s;
  }
  .back:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  .back.primary { background: linear-gradient(90deg,#6366f1,#8b5cf6); border-color: transparent; color: #fff; }
  .back.primary:hover { color: #fff; box-shadow: 0 10px 24px -8px rgba(99,102,241,0.6); }
  .topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: #fff; font-weight: 800; font-size: 14px; }
  .brand .sc { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #fff; background: linear-gradient(135deg,#6366f1,#2dd4bf);
    box-shadow: 0 8px 20px rgba(99,102,241,0.3); transition: transform .3s; }
  .brand:hover .sc { transform: scale(1.12) rotate(6deg); }
  .brand .dev { color: #818cf8; }
  .nav-actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .bottom-nav { margin-top: 52px; display: flex; gap: 12px; flex-wrap: wrap; }
  h1.post-title {
    margin: 36px 0 10px; font-size: clamp(1.7rem, 4vw, 2.5rem); line-height: 1.2;
    font-weight: 800; letter-spacing: -0.02em; color: #fff;
  }
  .meta { display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
    color: #64748b; font-size: 14px; margin-bottom: 32px;
    padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .meta .author {
    background: linear-gradient(120deg, #818cf8, #c084fc, #2dd4bf);
    -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 700;
  }
  /* In this Article index */
  .toc { border: 1px solid rgba(129,140,248,0.22); background: rgba(99,102,241,0.06);
    border-radius: 16px; padding: 20px 24px 20px; margin: 0 0 40px; }
  .toc-title { margin: 0 0 12px; display: flex; align-items: center; gap: 9px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #a5b4fc;
    font-family: 'JetBrains Mono', monospace; }
  .toc-dot { width: 7px; height: 7px; border-radius: 9999px; background: #2dd4bf; box-shadow: 0 0 8px #2dd4bf; }
  .toc ol { margin: 0; padding: 0; list-style: none; counter-reset: toc;
    columns: 2; column-gap: 28px; }
  .toc li { counter-increment: toc; margin: 5px 0; break-inside: avoid; }
  .toc a { color: #cbd5e1; text-decoration: none; font-size: 14px; display: flex; gap: 9px; align-items: baseline;
    padding: 3px 0; transition: color .15s; }
  .toc a::before { content: counter(toc); color: #6366f1; font-family: 'JetBrains Mono', monospace;
    font-size: 12px; font-weight: 600; min-width: 18px; }
  .toc a:hover { color: #fff; }
  @media (max-width: 620px) { .toc ol { columns: 1; } }
  article h1, article h2 { color: #fff; font-size: 1.35rem; margin: 2.2em 0 0.6em; letter-spacing: -0.01em;
    scroll-margin-top: 20px; }
  article h3, article h4 { color: #e2e8f0; font-size: 1.1rem; margin: 1.8em 0 0.5em; scroll-margin-top: 20px; }
  article p { margin: 0.9em 0; }
  article a { color: #2dd4bf; text-decoration: none; }
  article a:hover { text-decoration: underline; }
  article img {
    max-width: 100%; height: auto; border-radius: 12px; margin: 18px 0;
    border: 1px solid rgba(255,255,255,0.1); display: block;
  }
  article ul, article ol { padding-left: 1.4em; margin: 0.9em 0; }
  article li { margin: 0.35em 0; }
  article strong { color: #e2e8f0; }
  article table { border-collapse: collapse; width: 100%; margin: 18px 0; font-size: 14px; display: block; overflow-x: auto; }
  article th, article td { border: 1px solid rgba(255,255,255,0.12); padding: 8px 12px; text-align: left; }
  article th { background: rgba(99,102,241,0.12); color: #e2e8f0; }
  article pre {
    font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12.5px; line-height: 1.6;
    background: #0b0e1a; border: 1px solid rgba(129,140,248,0.18); border-radius: 12px;
    padding: 18px 20px; overflow-x: auto; margin: 20px 0; color: #d6deeb;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02); tab-size: 4;
  }
  article :not(pre) > code {
    font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.88em;
    background: rgba(129,140,248,0.12); border: 1px solid rgba(129,140,248,0.18);
    border-radius: 6px; padding: 1px 6px; color: #c7d2fe;
  }
  article pre code { background: none; border: 0; padding: 0; color: inherit; white-space: pre; }
  .foot { margin-top: 56px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; color: #64748b; font-size: 13px; }
  .foot a { color: #818cf8; text-decoration: none; font-weight: 600; }
  .foot a:hover { color: #a5b4fc; }
</style>
</head>
<body>
<script defer src="../site-guard.js"></script>
<div class="backdrop"></div>
<div class="glowbar"></div>
<div class="wrap">
  <div class="topbar">
    <a class="brand" href="../"><span class="sc">SC</span>shrey<span class="dev">.dev</span></a>
    <div class="nav-actions">
      <a class="back primary" href="../blogs.html">&#8592; All Posts</a>
      <a class="back" href="../">Portfolio</a>
    </div>
  </div>
  <h1 class="post-title">${meta.title}</h1>
  <p class="meta"><span class="author">Shrey Chauhan</span> &middot; ${meta.date} &middot; Business Central / AL</p>
  ${toc}
  <article>
${body}
  </article>
  <div class="bottom-nav">
    <a class="back primary" href="../blogs.html">&#8592; Back to all posts</a>
    <a class="back" href="../">Portfolio home</a>
  </div>
  <div class="foot">
    <span>&copy; ${new Date().getFullYear()} Shrey Chauhan</span>
    <a href="../">shrey.dev &#8599;</a>
  </div>
</div>
</body>
</html>
`

// ---- Blog index (tiles) page: public/blogs.html --------------------------
function indexTile(blog) {
  const svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[blog.glyph] || GLYPHS.braces}</svg>`
  const tags = blog.tags.map((t) => `<span class="tag">${t}</span>`).join('')
  return `    <a class="tile" href="blog/${blog.slug}.html">
      <div class="tile-top">
        <span class="tile-ico" style="background:${blog.grad}">${svg}</span>
        <span class="tile-date">${blog.date}</span>
      </div>
      <h2 class="tile-title">${blog.title}</h2>
      <p class="tile-ex">${blog.excerpt}</p>
      <div class="tile-foot"><div class="tags">${tags}</div><span class="read">Read &#8599;</span></div>
    </a>`
}

function indexPage(blogs) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Blog | Shrey Chauhan</title>
<meta name="description" content="Practical Microsoft Dynamics 365 Business Central & AL development guides by Shrey Chauhan." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #060810; color: #cbd5e1; font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  .backdrop { position: fixed; inset: 0; pointer-events: none; opacity: 0.025;
    background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 56px 56px; }
  .glowbar { position: fixed; top: -260px; left: 50%; transform: translateX(-50%); width: 760px; height: 440px;
    border-radius: 9999px; pointer-events: none; background: rgba(79,70,229,0.16); filter: blur(140px); }
  .wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 44px 22px 90px; }
  .topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: #fff; font-weight: 800; font-size: 14px; }
  .brand .sc { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #fff; background: linear-gradient(135deg,#6366f1,#2dd4bf);
    box-shadow: 0 8px 20px rgba(99,102,241,0.3); transition: transform .3s; }
  .brand:hover .sc { transform: scale(1.12) rotate(6deg); }
  .brand .dev { color: #818cf8; }
  .back { display: inline-flex; align-items: center; gap: 6px; color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 600;
    border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); padding: 8px 16px; border-radius: 12px; transition: all .2s; }
  .back:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  .head { text-align: center; margin: 46px 0 8px; }
  .eyebrow { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #a5b4fc;
    border: 1px solid rgba(129,140,248,0.25); background: rgba(129,140,248,0.06); padding: 6px 16px; border-radius: 9999px; margin-bottom: 16px; }
  h1 { margin: 0 0 10px; font-size: clamp(2rem,5vw,3rem); font-weight: 800; letter-spacing: -0.02em; color: #fff; }
  .grad { background: linear-gradient(120deg,#818cf8,#c084fc,#2dd4bf); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .lead { max-width: 620px; margin: 0 auto; color: #94a3b8; font-size: 16px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; margin-top: 44px; }
  .tile { position: relative; display: flex; flex-direction: column; text-decoration: none; border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.025); border-radius: 20px; padding: 24px; transition: transform .3s, border-color .3s, box-shadow .3s; backdrop-filter: blur(12px); }
  .tile:hover { transform: translateY(-6px); border-color: rgba(129,140,248,0.35); box-shadow: 0 24px 50px -20px rgba(99,102,241,0.4); }
  .tile-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .tile-ico { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #fff;
    box-shadow: 0 10px 24px -8px rgba(0,0,0,0.6); transition: transform .3s; }
  .tile-ico svg { width: 22px; height: 22px; }
  .tile:hover .tile-ico { transform: scale(1.1); }
  .tile-date { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #64748b; }
  .tile-title { margin: 0 0 8px; font-size: 17px; font-weight: 700; color: #fff; line-height: 1.35; letter-spacing: -0.01em; }
  .tile:hover .tile-title { color: #c7d2fe; }
  .tile-ex { margin: 0; flex: 1; font-size: 13.5px; line-height: 1.65; color: #94a3b8; }
  .tile-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 18px; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #94a3b8; border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03); border-radius: 6px; padding: 2px 8px; }
  .read { font-size: 12px; font-weight: 700; color: #2dd4bf; opacity: 0; transition: opacity .3s; white-space: nowrap; }
  .tile:hover .read { opacity: 1; }
  .foot { margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; color: #64748b; font-size: 13px; }
  .foot a { color: #818cf8; text-decoration: none; font-weight: 600; }
</style>
</head>
<body>
<script defer src="site-guard.js"></script>
<div class="backdrop"></div>
<div class="glowbar"></div>
<div class="wrap">
  <div class="topbar">
    <a class="brand" href="./"><span class="sc">SC</span>shrey<span class="dev">.dev</span></a>
    <a class="back" href="./">&#8592; Back to portfolio</a>
  </div>

  <div class="head">
    <span class="eyebrow">Blog</span>
    <h1>Things I&#8217;ve <span class="grad">written</span></h1>
    <p class="lead">Practical AL and Microsoft Dynamics 365 Business Central development guides — ${blogs.length} in-depth articles, all hosted here.</p>
  </div>

  <div class="grid">
${blogs.map(indexTile).join('\n')}
  </div>

  <div class="foot">
    <span>&copy; ${new Date().getFullYear()} Shrey Chauhan</span>
    <a href="./">shrey.dev &#8599;</a>
  </div>
</div>
</body>
</html>
`
}

fs.mkdirSync(OUT_DIR, { recursive: true })

let hadError = false
for (const blog of BLOGS) {
  const srcPath = blog.abs || path.join(SRC_DIR, blog.file)
  const imgDir = path.join(OUT_DIR, 'img', blog.slug)
  let imgCount = 0

  try {
    const result = await mammoth.convertToHtml(
      { path: srcPath },
      {
        convertImage: mammoth.images.imgElement(async (image) => {
          const buffer = await image.read()
          imgCount += 1
          const ext = (image.contentType || 'image/png').split('/')[1].replace('jpeg', 'jpg')
          const name = `${imgCount}.${ext}`
          fs.mkdirSync(imgDir, { recursive: true })
          fs.writeFileSync(path.join(imgDir, name), buffer)
          return { src: `img/${blog.slug}/${name}`, alt: `Screenshot ${imgCount}` }
        }),
      },
    )
    const { html, headings } = enhance(result.value)
    fs.writeFileSync(path.join(OUT_DIR, `${blog.slug}.html`), template(blog, tocHtml(headings), html))
    console.log(`OK  ${blog.slug}  (${imgCount} images, ${headings.length} TOC entries)`)
  } catch (err) {
    hadError = true
    console.error(`FAIL ${blog.slug}: ${err.message}`)
  }
}

// Emit the tiles index page (public/blogs.html), one level above OUT_DIR.
fs.writeFileSync(path.resolve('public/blogs.html'), indexPage(BLOGS))
console.log(`OK  blogs.html  (${BLOGS.length} tiles)`)

process.exit(hadError ? 1 : 0)
