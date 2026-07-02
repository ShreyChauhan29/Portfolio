import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Braces,
  Briefcase,
  Building2,
  Code2,
  Container,
  Database,
  Download,
  Factory,
  FileSpreadsheet,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plug,
  Receipt,
  Ship,
  Sparkles,
  Webhook,
  Wrench,
  X,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const LINKS = {
  github: 'https://github.com/ShreyChauhan29',
  linkedin: 'https://www.linkedin.com/in/shrey-chauhan-67a628227/',
  email: 'shreychauhan15312902@gmail.com',
  phone: '+91 84609 95300',
  resume: 'Shrey-Chauhan-Resume.docx',
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const STATS = [
  { value: '2.5+', label: 'Years in D365 BC & NAV' },
  { value: '35+', label: 'Client Projects Delivered' },
  { value: '10', label: 'Independent Modules Built' },
  { value: '7', label: 'Technical Blogs Published' },
]

const EXPERIENCE = [
  {
    role: 'Technical Consultant',
    company: 'Leaping Frog Solutions Pvt. Ltd.',
    note: 'Promoted from Associate Technical Consultant',
    period: 'Dec 2023 — Present',
    location: 'India',
    bullets: [
      'Design, customize, and deploy Microsoft Dynamics 365 Business Central and NAV solutions across 35+ client projects spanning manufacturing, pharmaceuticals, healthcare, chemicals, F&B, shipping, and NGO sectors.',
      'Built 10 independent modules from scratch — EXIM, E-Way Bill, MSME, Advance Payment, Terms & Conditions, Plant & Maintenance, Material Requisition, Donation Transaction, Branch Accounting, and Transfer Order Dimension Updation.',
      'Led code and data migration for NAV → Business Central projects including ALTA, TeamLease, Medilux, and KL Dugar, plus implementations for SGMT, Vijaya Diagnostic Centre, and Equitron Medica.',
      'Developed custom APIs (Donation Transaction API with full documentation) and integrated third-party services: E-Way Bill and E-Invoicing via GSTRobo, WhatsApp, and live container tracking.',
      'Delivered complex reports — Cash Book Ledger, MRP, lot-wise inventory ageing and valuation, aged AR/AP, payment export with UTR updation — plus Excel import/export frameworks with validation.',
      'Mentor three associate consultants, published 7 technical blogs, and run internal knowledge-sharing sessions on AL best practices and GitHub Copilot.',
      'Manage Azure environments and users, work with DevOps builds and deployments, and handle databases via SQL Server Management Studio.',
    ],
    tags: ['AL', 'Business Central', 'Dynamics NAV', 'SQL Server', 'REST APIs', 'Azure', 'Power Platform'],
  },
  {
    role: 'Technical Intern',
    company: 'Leaping Frog Solutions Pvt. Ltd.',
    period: 'Jan 2023 — Apr 2023',
    location: 'India',
    bullets: [
      'Trained in Microsoft Dynamics 365 Business Central and the AL programming language.',
      'Completed a mini-project building a Business Central extension from requirement to deployment.',
    ],
    tags: ['AL', 'Business Central', 'Extension Development'],
  },
]

const PROJECTS = [
  {
    icon: BarChart3,
    title: 'Dimension-Based Reporting',
    description:
      'Multi-dimensional financial and operational reporting in Business Central — including automatic dimension updation on Transfer Orders at shipment and receipt for both in-transit and direct transfers.',
    tags: ['AL', 'RDLC Reports', 'Dimensions', 'Business Central'],
  },
  // {
  //   icon: Receipt,
  //   title: 'GST / TDS / TCS Automation',
  //   description:
  //     'Automated Indian statutory tax workflows — GST computation, TDS/TCS deduction and posting — reducing manual tax entries and compliance errors across purchase and sales cycles.',
  //   tags: ['AL', 'Indian Tax Localization', 'Business Central'],
  // },
  {
    icon: Plug,
    title: 'E-Way Bill & E-Invoicing Integration',
    description:
      'Real-time integration with government E-Way Bill and E-Invoicing portals via GSTRobo — JSON payload generation, IRN/QR retrieval, and error handling built directly into posting routines.',
    tags: ['REST API', 'GSTRobo', 'JSON', 'AL'],
  },
  {
    icon: Webhook,
    title: 'Custom APIs & WhatsApp Integration',
    description:
      'Codeunit-based Donation Transaction API for the SGMT NGO project with full documentation, plus WhatsApp messaging integration — secure, reliable endpoints designed for external consumers.',
    tags: ['API Development', 'AL Codeunits', 'WhatsApp', 'SGMT'],
  },
  {
    icon: FileSpreadsheet,
    title: 'Advanced Reporting Suite',
    description:
      'Complex reports across clients: Cash Book Ledger, MRP, lot-wise inventory ageing and valuation, aged AR/AP, and payment export with UTR updation — backed by Excel import/export frameworks with validation.',
    tags: ['RDLC', 'Excel Integration', 'SQL', 'AL'],
  },
  {
    icon: Ship,
    title: 'EXIM Module',
    description:
      'Independent export–import module covering the full EXIM document lifecycle, implemented for MLA Industries and enhanced per client business processes for international trade.',
    tags: ['AL', 'Business Central', 'Module Design'],
  },
  {
    icon: Building2,
    title: 'MSME Compliance Module',
    description:
      'Vendor payment tracking module enforcing MSME Act payment timelines, with ageing visibility and alerts so finance teams stay compliant with statutory payment windows.',
    tags: ['AL', 'Business Central', 'Compliance'],
  },
  {
    icon: Factory,
    title: 'Manufacturing & Lot Tracking',
    description:
      'Lot and item selection on sales and transfer lines with auto-updated manufacturing/expiry dates, tracking specifications, and reservation entries — plus item substitution at Production BOM level with live component updates on released orders.',
    tags: ['AL', 'Item Tracking', 'Production BOM'],
  },
  {
    icon: Container,
    title: 'E-Commerce & Container Tracking',
    description:
      'E-commerce module importing sales orders and credit memos from external systems, and a third-party container tracking integration surfacing live shipment status inside the ERP.',
    tags: ['REST API', 'AL', 'Logistics', 'Integration'],
  },
]

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: 'ERP Development',
    skills: [
      'AL Language',
      'Dynamics 365 Business Central',
      'Dynamics NAV',
      'Extension Development',
      'RDLC Reports',
      'NAV → BC Migration',
    ],
  },
  {
    icon: Plug,
    title: 'Integrations & APIs',
    skills: [
      'REST APIs',
      'JSON / XML',
      'E-Way Bill',
      'E-Invoicing (IRP)',
      'Container Tracking',
      'Web Services',
    ],
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    skills: [
      'SQL Server',
      'SSMS',
      'Oracle SQL',
      'Power BI',
      'Dimension Reporting',
      'MySQL',
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    skills: [
      'VS Code',
      'Git & GitHub',
      'GitHub Copilot',
      'Azure Portal',
      'DevOps',
      'Power Apps',
      'Power Automate',
      'ERP Architecture',
    ],
  },
]

// ---------------------------------------------------------------------------
// Scroll-reveal hook
// ---------------------------------------------------------------------------

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ---------------------------------------------------------------------------
// Dynamic background
// ---------------------------------------------------------------------------

// Constellation of particles that drift, link up when close, and connect to
// the cursor as it moves across the page.
function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf
    let w = 0
    let h = 0
    let particles = []
    const mouse = { x: -1e4, y: -1e4 }

    const init = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((w * h) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.7,
      }))
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -1e4
      mouse.y = -1e4
    }

    const LINK_DIST = 110
    const MOUSE_DIST = 200

    const tick = () => {
      if (w !== window.innerWidth || h !== window.innerHeight) init()
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // gentle pull toward the cursor when it is nearby
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_DIST && dist > 1) {
          p.vx += (dx / dist) * 0.012
          p.vy += (dy / dist) * 0.012
        }
        // speed cap keeps the pull from snowballing
        const speed = Math.hypot(p.vx, p.vy)
        if (speed > 0.7) {
          p.vx = (p.vx / speed) * 0.7
          p.vy = (p.vy / speed) * 0.7
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(148, 163, 184, 0.45)'
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.22 * (1 - d / LINK_DIST)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < MOUSE_DIST) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(45, 212, 191, ${0.35 * (1 - dm / MOUSE_DIST)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(tick)
    }

    init()
    window.addEventListener('resize', init)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0" aria-hidden="true" />
}

// Soft gradient glow that trails the cursor with a smoothed follow.
function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    )
      return
    const el = glowRef.current
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 3
    let x = targetX
    let y = targetY
    let raf

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }
    const tick = () => {
      x += (targetX - x) * 0.09
      y += (targetY - y) * 0.09
      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="reveal mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/5 px-4 py-1.5 font-mono text-xs tracking-wider text-indigo-300 uppercase">
        <Sparkles size={13} />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>}
    </div>
  )
}

function Badge({ children, subtle = false }) {
  return (
    <span
      className={
        subtle
          ? 'rounded-md border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-xs text-slate-400'
          : 'rounded-md border border-indigo-400/20 bg-indigo-400/8 px-2.5 py-1 font-mono text-xs text-indigo-300'
      }
    >
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2 text-sm font-bold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-teal-400 font-mono text-xs text-white shadow-lg shadow-indigo-500/25">
            SC
          </span>
          <span className="hidden sm:inline">
            shrey<span className="text-indigo-400">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={LINKS.resume}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:scale-[1.03]"
            >
              <Download size={15} />
              Resume
            </a>
          </li>
        </ul>

        <button
          className="rounded-lg p-2 text-slate-300 hover:bg-white/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-white/5 px-5 pb-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href={LINKS.resume}
            download
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white"
          >
            <Download size={15} />
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* Ambient gradient orbs, slowly drifting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/2 h-[480px] w-[720px] rounded-full bg-indigo-600/20 blur-[140px]"
          style={{ animation: 'orb-drift-a 16s ease-in-out infinite' }}
        />
        <div
          className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]"
          style={{ animation: 'orb-drift-b 20s ease-in-out infinite' }}
        />
        <div
          className="absolute top-64 -right-32 h-72 w-72 rounded-full bg-violet-600/15 blur-[120px]"
          style={{ animation: 'orb-drift-c 24s ease-in-out infinite' }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            Open to opportunities
          </span>
        </div>

        <h1
          className="animate-fade-up mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
          style={{ animationDelay: '120ms' }}
        >
           <span className="gradient-text">Shrey Chauhan</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
          style={{ animationDelay: '240ms' }}
        >
          Microsoft Dynamics 365 <span className="text-slate-200">Business Central Developer</span> — turning
          business requirements into robust ERP solutions with AL, smart integrations, and clean architecture.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: '360ms' }}
        >
          <a
            href={LINKS.resume}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.04] hover:shadow-indigo-500/50"
          >
            <Download size={17} />
            Download Resume
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:scale-[1.04] hover:border-white/20"
          >
            <Github size={17} />
            GitHub
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:scale-[1.04] hover:border-white/20"
          >
            <Linkedin size={17} />
            LinkedIn
          </a>
        </div>

        <div
          className="animate-fade-up mt-8 flex items-center justify-center gap-2 text-sm text-slate-500"
          style={{ animationDelay: '480ms' }}
        >
          <MapPin size={14} />
          Mumbai, India · Technical Consultant @ Leaping Frog Solutions
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="About Me"
        title="ERP developer who speaks business"
        subtitle="From requirement gathering to go-live — I build the systems companies run on."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="glass reveal rounded-2xl p-8 lg:col-span-3">
          <p className="leading-relaxed text-slate-300">
            I&rsquo;m a Technical Consultant specializing in{' '}
            <span className="font-semibold text-white">Microsoft Dynamics 365 Business Central</span> and
            Dynamics NAV, with 2.5+ years of hands-on experience across the full ERP lifecycle — analysis,
            solution design, development in the <span className="font-semibold text-white">AL language</span>,
            integrations, and debugging.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            I&rsquo;ve delivered implementations, NAV-to-BC code and data migrations, and support across 35+
            projects in manufacturing, pharmaceuticals, healthcare, chemicals, and F&amp;B — including 10
            independent modules built from scratch and API integrations from government portals (E-Way Bill,
            E-Invoicing) to WhatsApp. Off the keyboard, I write technical blogs, mentor associate consultants,
            and run knowledge-sharing sessions. I take ownership of hard problems and care about solutions that
            survive contact with real users.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>AL Language</Badge>
            <Badge>ERP Architecture</Badge>
            <Badge>BC Customization</Badge>
            <Badge>API Integrations</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="glass reveal flex flex-col items-center justify-center rounded-2xl p-6 text-center transition-colors hover:border-indigo-400/30"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="gradient-text text-3xl font-extrabold">{stat.value}</span>
              <span className="mt-2 text-xs leading-snug text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass reveal mt-6 flex flex-col items-start gap-3 rounded-2xl p-6 sm:flex-row sm:items-center">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-teal-400/20 text-indigo-300">
          <GraduationCap size={20} />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">
            B.E. Computer Science &amp; Engineering — Gujarat Technological University
          </p>
          <p className="text-sm text-slate-400">2019 – 2023 · CGPA 9.28</p>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="Intern to Technical Consultant — shipping ERP solutions the whole way."
      />

      <div className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:hidden before:w-px before:bg-gradient-to-b before:from-indigo-500/60 before:via-violet-500/30 before:to-transparent sm:before:block">
        {EXPERIENCE.map((job) => (
          <article key={job.role} className="relative sm:pl-14">
            <span className="absolute top-7 left-2.5 hidden h-4 w-4 rounded-full border-2 border-indigo-400 bg-[#060810] shadow-[0_0_12px_rgba(99,102,241,0.7)] sm:block" />
            <div className="glass reveal group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{job.role}</h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-indigo-300">
                    <Briefcase size={14} />
                    {job.company}
                  </p>
                  {job.note && <p className="mt-1 text-xs text-teal-300/80">{job.note}</p>}
                </div>
                <span className="rounded-lg border border-white/8 bg-white/4 px-3 py-1 font-mono text-xs text-slate-400">
                  {job.period}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} subtle>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        subtitle="Modules, automations, and integrations running in production for real businesses."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => {
          const Icon = project.icon
          return (
            <article
              key={project.title}
              className="glass reveal group relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/30 hover:shadow-2xl hover:shadow-indigo-500/10"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-transparent to-teal-400/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/5 group-hover:to-teal-400/5 group-hover:opacity-100" />
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-teal-400/15 text-indigo-300 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={21} />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-300"
                />
              </div>
              <h3 className="text-base font-bold text-white">{project.title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} subtle>
                    {tag}
                  </Badge>
                ))}
              </div>
            </article>
          )
        })}
      </div>

      <div className="glass reveal mt-8 rounded-2xl p-6">
        <p className="mb-3 font-mono text-xs tracking-wider text-slate-500 uppercase">
          Independent modules shipped
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'EXIM',
            'E-Way Bill',
            'MSME',
            'Advance Payment',
            'Terms & Conditions',
            'Plant & Maintenance',
            'Material Requisition',
            'Donation Transaction',
            'Branch Accounting',
            'Transfer Order Dimensions',
          ].map((mod) => (
            <Badge key={mod}>{mod}</Badge>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="Tools of the trade"
        subtitle="The stack I use to design, build, and ship ERP solutions."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => {
          const Icon = group.icon
          return (
            <div
              key={group.title}
              className="glass reveal rounded-2xl p-7 transition-all duration-300 hover:border-indigo-400/30"
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-teal-400/15 text-indigo-300">
                  <Icon size={19} />
                </span>
                <h3 className="text-base font-bold text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-indigo-400/40 hover:bg-indigo-400/10 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer id="contact" className="relative mt-12 scroll-mt-24 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <div className="reveal">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&rsquo;s build something <span className="gradient-text">together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Whether it&rsquo;s a Business Central implementation, a tricky integration, or a migration — I&rsquo;d
            love to hear about it.
          </p>

          <a
            href={`mailto:${LINKS.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.04] hover:shadow-indigo-500/50"
          >
            <Mail size={17} />
            {LINKS.email}
          </a>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 transition-all hover:scale-110 hover:border-white/20 hover:text-white"
            >
              <Github size={18} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 transition-all hover:scale-110 hover:border-white/20 hover:text-white"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`tel:${LINKS.phone.replace(/\s/g, '')}`}
              aria-label="Phone"
              className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 transition-all hover:scale-110 hover:border-white/20 hover:text-white"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Shrey Chauhan. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-mono">
            <Braces size={12} />
            Built with React, Tailwind CSS &amp; Lucide
          </p>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  useReveal()

  return (
    <div className="relative min-h-screen">
      {/* Subtle grid backdrop */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <ParticleField />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </div>
  )
}
