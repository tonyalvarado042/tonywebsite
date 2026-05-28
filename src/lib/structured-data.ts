export const SITE_URL = 'https://tonyalvarado.com'

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
    'Coach y entrenador de ciclismo en Costa Rica con más de 22 años de trayectoria. Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels.',
  url: SITE_URL,
  nationality: { '@type': 'Country', name: 'Costa Rica' },
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
  ],
  // sameAs: pendiente — URLs de redes sociales y perfiles externos por confirmar con el cliente
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
