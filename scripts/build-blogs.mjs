// Converts the blog .docx sources into styled static pages under public/blog/.
// Run: node scripts/build-blogs.mjs
import fs from 'node:fs'
import path from 'node:path'
import mammoth from 'mammoth'

const SRC_DIR = 'C:/Users/Shrey Chauhan/OneDrive - Leaping Frog Solutions Pvt. Ltd/Documents/Blogs'
const OUT_DIR = path.resolve('public/blog')

const BLOGS = [
  {
    file: 'TryFunction Blog.docx',
    slug: 'understanding-tryfunction-in-al',
    title: 'Understanding [TryFunction] in AL for Business Central',
    date: 'June 2026',
  },
  {
    file: 'Building Robust Custom APIs in Business Central.docx',
    slug: 'building-robust-custom-apis',
    title: 'Building Robust Custom APIs in Business Central',
    date: 'March 2026',
  },
  {
    file: 'Mastering RecordRef & FieldRef.docx',
    slug: 'mastering-recordref-fieldref',
    title: 'Mastering RecordRef & FieldRef in Business Central',
    date: 'January 2026',
  },
  {
    file: 'Automating Job Queue Monitoring in Business Central.docx',
    slug: 'automating-job-queue-monitoring',
    title: 'Automating Job Queue Monitoring in Business Central',
    date: 'December 2025',
  },
  {
    file: 'Migrating from C-AL to AL Using Txt2AL.docx',
    slug: 'migrating-cal-to-al-txt2al',
    title: 'Migrating from C-AL to AL Using Txt2AL',
    date: 'October 2025',
  },
  {
    file: 'Boost Your AL Coding Productivity with AI Extensions.docx',
    slug: 'boost-al-productivity-with-ai-extensions',
    title: 'Boost Your AL Coding Productivity with AI Extensions',
    date: 'September 2025',
  },
  {
    file: 'Amount in Words.docx',
    slug: 'amount-in-words',
    title: 'Amount in Words in Microsoft Dynamics 365 Business Central',
    date: 'July 2025',
  },
  {
    file: 'Upgrading Customized C-AL to Business Central.docx',
    slug: 'upgrading-customized-cal-to-business-central',
    title: 'Upgrading Customized C-AL to Business Central',
    date: 'July 2025',
  },
  {
    file: 'How to Remove Warning of Document Attachment FactBox.docx',
    slug: 'remove-doc-attachment-factbox-warning',
    title: 'How to Remove the Warning of Document Attachment FactBox',
    date: 'June 2025',
  },
  {
    file: 'How to Create a FactBox.docx',
    slug: 'how-to-create-a-factbox',
    title: 'How to Create a FactBox in Business Central',
    date: 'June 2025',
  },
  {
    file: 'How to Change Subject, Body and Attachment Name while Sending E-Mail.docx',
    slug: 'customize-email-subject-body-attachment',
    title: 'How to Change Subject, Body and Attachment Name while Sending E-Mail',
    date: 'November 2024',
  },
]

const template = (meta, body) => `<!doctype html>
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
  .wrap { position: relative; max-width: 780px; margin: 0 auto; padding: 48px 22px 80px; }
  .back {
    display: inline-flex; align-items: center; gap: 6px;
    color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 600;
    border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
    padding: 8px 16px; border-radius: 12px; transition: all .2s;
  }
  .back:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  h1.post-title {
    margin: 36px 0 10px; font-size: clamp(1.7rem, 4vw, 2.5rem); line-height: 1.2;
    font-weight: 800; letter-spacing: -0.02em; color: #fff;
  }
  .meta { display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
    color: #64748b; font-size: 14px; margin-bottom: 36px;
    padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .meta .author {
    background: linear-gradient(120deg, #818cf8, #c084fc, #2dd4bf);
    -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 700;
  }
  article h1, article h2 { color: #fff; font-size: 1.35rem; margin: 2.2em 0 0.6em; letter-spacing: -0.01em; }
  article h3, article h4 { color: #e2e8f0; font-size: 1.1rem; margin: 1.8em 0 0.5em; }
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
  article pre, article code {
    font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px;
    background: #0b0e1a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
  }
  article code { padding: 2px 6px; }
  article pre { padding: 16px; overflow-x: auto; }
  article pre code { border: 0; padding: 0; }
  .foot { margin-top: 56px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; color: #64748b; font-size: 13px; }
  .foot a { color: #818cf8; text-decoration: none; font-weight: 600; }
  .foot a:hover { color: #a5b4fc; }
</style>
</head>
<body>
<div class="backdrop"></div>
<div class="glowbar"></div>
<div class="wrap">
  <a class="back" href="../">&#8592; Back to portfolio</a>
  <h1 class="post-title">${meta.title}</h1>
  <p class="meta"><span class="author">Shrey Chauhan</span> &middot; ${meta.date} &middot; Business Central / AL</p>
  <article>
${body}
  </article>
  <div class="foot">
    <span>&copy; ${new Date().getFullYear()} Shrey Chauhan</span>
    <a href="../">shrey.dev &#8599;</a>
  </div>
</div>
</body>
</html>
`

fs.mkdirSync(OUT_DIR, { recursive: true })

let hadError = false
for (const blog of BLOGS) {
  const srcPath = path.join(SRC_DIR, blog.file)
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
    fs.writeFileSync(path.join(OUT_DIR, `${blog.slug}.html`), template(blog, result.value))
    console.log(`OK  ${blog.slug}  (${imgCount} images, ${result.messages.length} warnings)`)
  } catch (err) {
    hadError = true
    console.error(`FAIL ${blog.file}: ${err.message}`)
  }
}
process.exit(hadError ? 1 : 0)
