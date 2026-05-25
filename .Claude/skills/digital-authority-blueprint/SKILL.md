---
name: digital-authority-blueprint
description: Guide the Tony Alvarado project through the Digital Authority Blueprint using phased audits, website architecture, SEO, GEO, PR assets, authority profiles, forms, analytics, and maintenance planning.
---

# Digital Authority Blueprint

## Purpose

Use this skill for the Tony Alvarado authority website and Digital Authority Blueprint project.

This skill helps Claude Code work step by step on:

- Client prerequisites audit
- Website architecture
- Premium website build
- Smart contact form
- SEO and Google setup
- Schema.org
- GEO and AI discoverability
- Authority platforms
- Digital PR package
- Analytics
- Maintenance planning

Use `CLAUDE.md` as the main source of client context.

## Client Context

Client: Tony Alvarado / Anthony Alvarado.

Main positioning:

Tony Alvarado helps people transform their lives through cycling.

The project must present Tony as:

- Cycling expert
- Entrepreneur
- Author
- Faith-driven leader
- Founder of PuroMTB
- Founder of Pure Cycling
- Founder of Bike & Bed Hotels
- Speaker and authority figure

The central theme is cycling, transformation, business, faith, community, and global vision.

## Global Rules

All visible website content must be in Spanish.

Do not invent information.

Do not invent:

- Awards
- Follower counts
- Press mentions
- Corporate clients
- Certifications
- Investment guarantees
- Wikipedia eligibility
- Wikidata eligibility
- Revenue claims
- Partnerships
- Celebrity relationships
- External sources
- Social media links
- Testimonials

Use these labels when needed:

- [INFORMACIÓN PENDIENTE]
- [FUENTE REQUERIDA]
- [VALIDACIÓN LEGAL REQUERIDA]
- [VALIDACIÓN DEL CLIENTE REQUERIDA]

If important information is missing, ask for it before implementing that part.

If the missing information is not critical, continue with a clearly marked placeholder.

## Technical Target

The final website may use:

- Next.js 15
- App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Schema.org JSON-LD
- Sitemap
- robots.txt
- Resend
- WhatsApp CTA
- Google Analytics GA4
- Google Search Console
- Vercel
- GitHub

Do not create the Next.js project unless the user authorizes the build phase.

## File Safety

Before modifying files:

- Inspect the project structure.
- Identify existing files.
- Explain what files will be changed.
- Do not delete client images.
- Do not overwrite assets.
- Keep old prototypes in `_archive`.
- Keep client images in `assets/client`.

Recommended structure:

```text
pagina web/
├── CLAUDE.md
├── .claude/
│   └── skills/
│       └── digital-authority-blueprint/
│           └── SKILL.md
├── _archive/
│   └── prototype-index.html
└── assets/
    └── client/
    Phase 0: Client Prerequisites Audit

Goal: review what exists and what is missing.

Check:

Public name
Photos
Photos with authority figures
Testimonials
Achievements
Books
Companies founded
Corporate clients
Spanish biography
English biography
Social media URLs
Domain
GitHub account
Existing press URLs
Assistant email
Assistant WhatsApp
YouTube interviews
Amazon book link
Brand assets
Logos
Color palette
Calendly or scheduling link

Output:

Confirmed information
Available assets
Missing information
Claims requiring sources
Risk areas
Recommended next step
Phase 1: Website Architecture

Goal: define the website before coding.

Consider these pages:

Home
/sobre-mi
/libros
/conferencias
/prensa
/blog
/contacto
/en only if authorized

Consider these homepage sections:

Header
Hero
Authority metrics
About Tony
Personal story
Mission
Business ecosystem
PuroMTB
Pure Cycling
Bike & Bed Hotels
Books
Interviews
Mentors
Testimonials
Speaking
FAQ
Contact
Footer

Output:

Sitemap
Homepage section order
CTA map
Asset usage map
Missing content list
Risks and validations
Phase 2: Website Build

Goal: build the approved website.

Use the approved architecture.

Design direction:

Premium
Athletic
Elegant
Clean
Human
Authority-driven
Inspired by Under Armour and Rapha
Purple and white can be used if appropriate

Avoid:

Neon
Cyberpunk
Generic AI visuals
Cheap gym aesthetics
Clutter

Output:

Files created or modified
Pages created
Components created
Assets used
Missing assets
Next step
Phase 3: Contact Form and WhatsApp

Goal: capture qualified leads.

Form fields:

Nombre
Email
WhatsApp opcional
Empresa
Tipo de consulta
Mensaje

Inquiry types:

Conferencia / Keynote
Evento corporativo
Inversión en Bike & Bed
Pure Cycling
Medios / prensa
Colaboración
Otro

Requirements:

Resend email sending
WhatsApp CTA if number is available
Professional email template
Success and error states
Environment variable notes

Output:

Form files changed
Environment variables needed
Test instructions
Missing contact information
Phase 4: SEO and Google

Goal: prepare for Google visibility.

Implement or plan:

Metadata
Meta descriptions
Open Graph
Twitter Cards
Canonical URLs
Sitemap
robots.txt
BreadcrumbList
FAQPage
Internal linking
Google Search Console checklist
Google Alerts checklist

Output:

SEO files created or modified
Schema added
Manual checklist
Pending validations
Phase 5: Authority Platforms

Goal: prepare external profiles.

Prepare checklists for:

Wikidata
Wikipedia
LinkedIn
Amazon Author Central
Goodreads
HARO or Featured-style PR
Crunchbase
Medium

Rules:

Do not claim Wikipedia eligibility without source review.
Do not create unsupported Wikidata statements.
Do not claim verification unless completed.
Mark missing sources clearly.

Output:

Profile setup checklist
Data needed by platform
Risk notes
Source requirements
Recommended order
Phase 6: Digital PR Package

Goal: prepare PR assets.

When authorized, create /pr/ with:

press-kit.md
pitch-emails.md
guest-articles.md

Include:

Short bio
Long bio
Founder story
Key stats
Books
Companies
Speaking topics
Media angles
Photo list
Contact info

Output:

PR files created
Drafts included
Missing assets
Outreach workflow
Phase 7: AI Discoverability and GEO

Goal: make the site understandable to AI systems.

Prepare or implement:

robots.txt for relevant crawlers
Schema.org Person
Schema.org Organization
Schema.org Book
Schema.org WebSite
Schema.org FAQPage
sameAs with verified links only
interactionStatistic only with exact counts
Blog content around core topics
Bilingual content if authorized
Wikidata if supported by sources

Output:

GEO changes made
Structured data added
Verified links used
Pending sameAs links
AI discoverability checklist
Phase 8: Maintenance

Goal: keep authority growing.

Plan:

Google Search Console review
Google Alerts review
PR outreach
Blog updates
Schema updates
AI response checks
Lead tracking

KPIs:

Google ranking for Tony Alvarado
Search Console impressions
Monthly leads
Media mentions
AI assistant recognition
Knowledge Panel status
Wikipedia/Wikidata status if applicable
Authority backlinks

Output:

Maintenance checklist
Monthly reporting structure
KPI table
Next content recommendations
Response Format

After each phase, respond with:

Phase completed
Files created or modified
What was implemented
Missing information
Risks or validations needed
Recommended next step

If no files were changed, say:

No files changed.