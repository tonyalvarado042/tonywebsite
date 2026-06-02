/**
 * Migration script: import local blog posts → Sanity CMS
 *
 * Run with:
 *   npx tsx scripts/import-local-posts-to-sanity.ts
 *
 * Requires:
 *   SANITY_WRITE_TOKEN en .env.local (raíz del proyecto)
 *
 * Cómo obtener el token de escritura:
 *   1. Ve a https://www.sanity.io/manage
 *   2. Abre el proyecto "pwq90id0"
 *   3. API → Tokens → "Add API token"
 *   4. Nombre: "Migration script" — Permisos: "Editor"
 *   5. Copia el token
 *   6. Agrégalo a .env.local: SANITY_WRITE_TOKEN=tu_token_aqui
 *   7. Corre el script de nuevo
 *
 * Seguridad:
 *   - Nunca duplica: omite posts cuyo slug ya existe en Sanity
 *   - Nunca borra: solo crea documentos nuevos
 *   - No modifica posts existentes en Sanity
 *   - No sube el token al repositorio
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ─── Cargar .env.local manualmente (sin dependencias extra) ──────────────────

function loadEnvFile(envPath: string): void {
  try {
    const content = readFileSync(envPath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIndex = trimmed.indexOf('=')
      if (eqIndex === -1) continue
      const key = trimmed.slice(0, eqIndex).trim()
      const val = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '')
      if (key && !process.env[key]) {
        process.env[key] = val
      }
    }
  } catch {
    // .env.local not found — rely on process.env already set
  }
}

loadEnvFile(resolve(process.cwd(), '.env.local'))

// ─── Verificar token de escritura ────────────────────────────────────────────

const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('\n❌  SANITY_WRITE_TOKEN no está definido.')
  console.error('\n   Cómo obtenerlo:')
  console.error('     1. Ve a https://www.sanity.io/manage → proyecto pwq90id0')
  console.error('     2. API → Tokens → "Add API token"')
  console.error('     3. Nombre: "Migration script" — Permisos: "Editor"')
  console.error('     4. Copia el token')
  console.error('     5. Agrega a .env.local (raíz del proyecto):')
  console.error('           SANITY_WRITE_TOKEN=tu_token_aqui')
  console.error('     6. Corre el script de nuevo con: npx tsx scripts/import-local-posts-to-sanity.ts\n')
  process.exit(1)
}

// ─── Cliente Sanity (con permiso de escritura) ────────────────────────────────

const sanityClient = createClient({
  projectId: 'pwq90id0',
  dataset: 'production',
  apiVersion: '2024-06-01',
  token,
  useCdn: false,
})

// ─── Datos de posts locales ───────────────────────────────────────────────────

import { blogPosts } from '../src/lib/blog-posts.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _keyIdx = 0
function uniqueKey(): string {
  return `k${Date.now()}${_keyIdx++}`
}

/**
 * Convierte un párrafo de texto plano a un bloque Portable Text.
 * Los pasos numerados ("1. Texto...") se conservan como párrafos normales;
 * Tony puede reformatearlos como listas numeradas desde el CMS.
 */
function paragraphToBlock(text: string): object {
  return {
    _type: 'block',
    _key: uniqueKey(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: uniqueKey(),
        text,
        marks: [],
      },
    ],
  }
}

// ─── Migración principal ──────────────────────────────────────────────────────

async function run(): Promise<void> {
  console.log('\n🔍  Consultando slugs existentes en Sanity...')

  const existing = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    '*[_type == "post"]{ slug }'
  )
  const existingSlugs = new Set(
    existing.map((p) => p.slug?.current).filter(Boolean)
  )

  console.log(`   📦  Posts en Sanity: ${existingSlugs.size}`)
  console.log(`   📂  Posts locales:   ${blogPosts.length}\n`)

  let created = 0
  let skipped = 0
  const errors: string[] = []

  for (const post of blogPosts) {
    if (existingSlugs.has(post.slug)) {
      console.log(`⏭   Omitido (ya existe): ${post.slug}`)
      skipped++
      continue
    }

    try {
      const doc = {
        _type: 'post',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        status: 'published',
        publishedAt: new Date(`${post.date}T00:00:00`).toISOString(),
        category: post.category,
        summary: post.summary,
        readingTime: post.readingTime,
        body: post.content.map(paragraphToBlock),
        ctaLabel: post.cta.label,
        ctaHref: post.cta.href,
        // Convierte "keyword1 keyword2" → ["keyword1", "keyword2"]
        keywords: post.keyword
          ? post.keyword.split(/\s+/).filter(Boolean)
          : [],
        featured: false,
      }

      await sanityClient.create(doc)
      console.log(`✅  Creado: ${post.slug}`)
      created++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      const line = `❌  Error en "${post.slug}": ${msg}`
      console.error(line)
      errors.push(line)
    }
  }

  // ─── Resumen ───────────────────────────────────────────────────────────────
  console.log('\n─────────────────────────────────────────────')
  console.log('📊  Resumen de la migración:')
  console.log(`    ✅  Creados:  ${created}`)
  console.log(`    ⏭   Omitidos: ${skipped}`)
  console.log(`    ❌  Errores:  ${errors.length}`)

  if (errors.length > 0) {
    console.log('\n   Errores detallados:')
    errors.forEach((e) => console.log(`   ${e}`))
  }

  if (created > 0) {
    console.log('\n🎉  Migración completa. Revisa el Studio en:')
    console.log('    https://tony-alvarado-cms.sanity.studio/\n')
  } else if (skipped === blogPosts.length) {
    console.log('\n✨  Todos los posts ya existen en Sanity. Nada que migrar.\n')
  }
}

run().catch((err) => {
  console.error('\n💥  Error inesperado:', err)
  process.exit(1)
})
