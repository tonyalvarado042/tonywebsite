// TODO: cambiar a https://tonyalvarado.com cuando el dominio final esté conectado.
export const SITE_URL = 'https://tonywebsite-three.vercel.app'

// ─── WebSite ──────────────────────────────────────────────────────────────────

export const websiteSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Tony Alvarado',
  url: SITE_URL,
  description:
    'Coach y entrenador de ciclismo en Costa Rica. Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels.',
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
  jobTitle: 'Coach y entrenador de ciclismo',
  description:
    'Coach y entrenador de ciclismo en Costa Rica con más de 22 años de trayectoria. Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels. Autor, conferencista y líder con propósito.',
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/tony-principal.png`,
    contentUrl: `${SITE_URL}/images/tony-principal.png`,
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
      name: 'Coach y entrenador de ciclismo',
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
    { '@type': 'Organization', name: 'Pure Cycling' },
    { '@type': 'Organization', name: 'PuroMTB' },
    { '@type': 'Organization', name: 'Bike & Bed Hotels' },
  ],
  knowsAbout: [
    'Ciclismo',
    'Mountain bike',
    'Ciclismo de ruta',
    'Entrenamiento de ciclismo',
    'Turismo deportivo',
    'Liderazgo',
    'Emprendimiento',
    'Transformación personal',
    'Fe y propósito',
    'Comunidad ciclista',
    'Costa Rica',
  ],
  knowsLanguage: [
    { '@type': 'Language', name: 'Español' },
  ],
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
  url: SITE_URL,
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
    'Hotel temático de ciclismo en Costa Rica con operación profesional y visión de expansión global.',
  url: `${SITE_URL}/bike-bed-hotels`,
  founder: { '@type': 'Person', '@id': `${SITE_URL}/#tony-alvarado` },
}

// ─── Book ─────────────────────────────────────────────────────────────────────

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
  // URL de Amazon y fecha de publicación: pendientes de confirmación
}
