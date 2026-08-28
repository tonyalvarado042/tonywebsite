export const SITE_URL = 'https://www.tonyalvarado.com'

// ─── WebSite ──────────────────────────────────────────────────────────────────

export const websiteSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Tony Alvarado',
  url: SITE_URL,
  description:
    'Desarrollador de proyectos turísticos en Costa Rica. Construye y opera hoteles temáticos: Bike & Bed Hotels y Humaya Costa Rica, en La Fortuna de San Carlos. Autor y conferencista.',
  inLanguage: 'es-CR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// ─── Person ───────────────────────────────────────────────────────────────────

export const personSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#tony-alvarado`,
  name: 'Tony Alvarado',
  alternateName: 'Anthony Alvarado',
  jobTitle: 'Desarrollador de proyectos turísticos',
  description:
    'Desarrollador de proyectos turísticos costarricense. Construye y opera hoteles temáticos en La Fortuna de San Carlos — Bike & Bed Hotels y Humaya Costa Rica — y dirige un ecosistema de empresas alrededor del ciclismo: PuroMTB y Pure Cycling. Autor y conferencista.',
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/og/tony-alvarado-og.jpg`,
    contentUrl: `${SITE_URL}/images/og/tony-alvarado-og.jpg`,
  },
  nationality: { '@type': 'Country', name: 'Costa Rica' },
  homeLocation: {
    '@type': 'Place',
    name: 'San José, Costa Rica',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San José',
      addressCountry: 'CR',
    },
  },
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Desarrollador de proyectos turísticos',
      occupationLocation: { '@type': 'Country', name: 'Costa Rica' },
    },
    {
      '@type': 'Occupation',
      name: 'Hotelero y operador de hospitalidad',
      occupationLocation: { '@type': 'Country', name: 'Costa Rica' },
    },
    {
      '@type': 'Occupation',
      name: 'Empresario y fundador',
      occupationLocation: { '@type': 'Country', name: 'Costa Rica' },
    },
    {
      '@type': 'Occupation',
      name: 'Conferencista y autor',
    },
  ],
  worksFor: [
    { '@type': 'Organization', name: 'Bike & Bed Hotels' },
    { '@type': 'Organization', name: 'Humaya Costa Rica' },
    { '@type': 'Organization', name: 'PuroMTB' },
    { '@type': 'Organization', name: 'Pure Cycling' },
  ],
  // knowsAbout — Fase 6 del DAB. Las IAs lo leen para decidir sobre qué temas
  // citar a esta persona. Solo áreas donde la experiencia es verificable.
  knowsAbout: [
    'Desarrollo de proyectos turísticos',
    'Hotelería',
    'Operación hotelera',
    'Turismo de bienestar',
    'Turismo deportivo',
    'Hoteles temáticos',
    'Copropiedad de activos turísticos',
    'La Fortuna de San Carlos',
    'Arenal',
    'Turismo en Costa Rica',
    'Emprendimiento',
    'Liderazgo',
    'Ciclismo',
    'Mountain bike',
    'Comunidad ciclista',
    'Transformación personal',
    'Fe y propósito',
    'Costa Rica',
  ],
  knowsLanguage: [
    { '@type': 'Language', name: 'Español' },
    { '@type': 'Language', name: 'Inglés' },
  ],
  author: [
    { '@type': 'Book', '@id': `${SITE_URL}/#secretos-empresario-exitoso` },
    { '@type': 'Book', '@id': `${SITE_URL}/#sigue-pedaleando` },
    { '@type': 'Book', '@id': `${SITE_URL}/#nuevo-negocio-turismo-2027` },
  ],
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/sobre-mi#webpage` },
  // ⚠️ PENDIENTE DE TONY — no se inventa nada (regla 24 del CLAUDE.md de este repo):
  //   · alumniOf → falta el nombre de la universidad donde estudió computación.
  //   · interactionStatistic → faltan los follower counts exactos por plataforma.
  //   · award → solo si hay reconocimientos verificables.
  //   · sameAs → faltan YouTube, TikTok, Amazon Author Central y Wikidata (Fase 4 del DAB).
  sameAs: [
    'https://www.facebook.com/profile.php?id=100090599181641',
    'https://www.linkedin.com/in/tony-alvarado-a1b3a820/',
    'https://www.instagram.com/tony_purecycling/',
    'https://x.com/TonyAlvaradocr',
  ],
}

// ─── Referencias reutilizables (para isPartOf / about en WebPage) ─────────────

export const websiteRef = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
}

export const personRef = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#tony-alvarado`,
  name: 'Tony Alvarado',
}

// ─── Organizations ────────────────────────────────────────────────────────────

export const puroMTBOrg: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#puromtb`,
  name: 'PuroMTB',
  description:
    'Tienda y comunidad de mountain bike y ciclismo de ruta en Costa Rica. Fundada en 2004.',
  url: 'https://puromtb.com',
  sameAs: ['https://puromtb.com'],
  foundingDate: '2004',
  founder: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
}

export const pureCyclingOrg: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#pure-cycling`,
  name: 'Pure Cycling',
  description:
    'Comunidad de entrenamiento de ciclismo online con plan personalizado, nutrición, mentalidad, movilidad y espiritualidad. Miembros en más de 30 países.',
  url: `${SITE_URL}/pure-cycling`,
  founder: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
}

export const bikeBedOrg: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#bike-bed-hotels`,
  name: 'Bike & Bed Hotels',
  description:
    'Hotel temático de ciclismo en La Fortuna de San Carlos, Costa Rica. Etapa 1 en operación desde septiembre de 2025.',
  url: `${SITE_URL}/bike-bed-hotels`,
  founder: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
}

export const humayaOrg: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#humaya`,
  name: 'Humaya Costa Rica',
  description:
    'Etapa 2 de Bike & Bed en La Fortuna de San Carlos: 10 villas con gimnasio, spa, piscinas termales, sauna y cold plunge. Apertura prevista para noviembre de 2026.',
  founder: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
  parentOrganization: { '@type': 'Organization', '@id': `${SITE_URL}/#bike-bed-hotels` },
}

// ─── Books ────────────────────────────────────────────────────────────────────

export const bookSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  '@id': `${SITE_URL}/#secretos-empresario-exitoso`,
  name: 'Secretos para ser un empresario exitoso',
  author: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
  publisher: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
  inLanguage: 'es',
  about: ['Emprendimiento', 'Liderazgo', 'Ciclismo', 'Costa Rica'],
  url: 'https://www.amazon.com/dp/B0CCZWJG7S',
  // ISBN pendiente de confirmación del cliente
}

export const bookSchema2: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  '@id': `${SITE_URL}/#sigue-pedaleando`,
  name: 'Sigue Pedaleando',
  author: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
  publisher: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
  inLanguage: 'es',
  about: ['Ciclismo', 'Transformación personal', 'Fe', 'Disciplina', 'Costa Rica'],
  url: 'https://www.amazon.com/-/es/Tony-Alvarado/dp/B0H2QD8PPD/',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://www.amazon.com/-/es/Tony-Alvarado/dp/B0H2QD8PPD/',
  },
}

// Tercer libro — en preparación. NO lleva enlace de compra, ISBN ni fecha exacta
// hasta que existan. `PreOrder` es la señal correcta para un título anunciado
// y todavía no publicado.
export const bookSchema3: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  '@id': `${SITE_URL}/#nuevo-negocio-turismo-2027`,
  name: 'El nuevo negocio del turismo 2027',
  author: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
  publisher: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
  inLanguage: 'es',
  about: [
    'Turismo',
    'Hotelería',
    'Desarrollo de proyectos turísticos',
    'Turismo de bienestar',
    'Copropiedad',
    'Operación hotelera',
    'Costa Rica',
  ],
  url: `${SITE_URL}/libros/el-nuevo-negocio-del-turismo-2027`,
  bookFormat: 'https://schema.org/Paperback',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/PreOrder',
    url: `${SITE_URL}/libros/el-nuevo-negocio-del-turismo-2027`,
  },
}
