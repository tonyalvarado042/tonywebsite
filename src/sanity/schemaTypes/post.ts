import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  fields: [
    // ── Campos principales ────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Borrador', value: 'draft' },
          { title: 'Publicado', value: 'published' },
          { title: 'Oculto', value: 'hidden' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required().error('El estado es obligatorio.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return 'Agrega una fecha de publicación antes de publicar el artículo.'
          return true
        }).warning(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      placeholder: 'Ej: Ciclismo — Entrenamiento',
    }),

    // ── Resumen ───────────────────────────────────────────────────────────────
    defineField({
      name: 'summary',
      title: 'Resumen del artículo',
      type: 'text',
      rows: 3,
      description: 'Texto corto para la tarjeta del blog y SEO. No se muestra como bloque dentro del artículo.',
      validation: (Rule) => [
        Rule.custom((val: string | undefined) => {
          if (!val || val.trim() === '') return 'El resumen mejora el SEO y aparece en la tarjeta del blog. Recomendado: completarlo.'
          return true
        }).warning(),
        Rule.max(200).warning('El resumen se muestra en la tarjeta del blog. Recomendado: menos de 200 caracteres.'),
      ],
    }),
    defineField({
      name: 'readingTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
    }),

    // ── Imagen principal ──────────────────────────────────────────────────────
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (SEO)',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((val: string | undefined) => {
              if (!val || val.trim() === '') return 'Describe la imagen para mejorar SEO y accesibilidad.'
              return true
            }).warning(),
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Artículo destacado',
      type: 'boolean',
      initialValue: false,
    }),

    // ── Contenido del artículo ─────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Contenido del artículo',
      type: 'array',
      validation: (Rule) =>
        Rule.min(1).warning('El artículo no tiene contenido todavía. Agrega al menos un bloque de texto.'),
      of: [
        // ── Bloque de texto enriquecido ────────────────────────────────
        {
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'H2 — Sección principal', value: 'h2' },
            { title: 'H3 — Subsección', value: 'h3' },
            { title: 'H4 — Detalle', value: 'h4' },
            { title: 'Cita / Blockquote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Lista con viñetas', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: '🟣 Destacado morado', value: 'highlightPurple' },
              { title: '🟡 Destacado dorado', value: 'highlightGold' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule: any) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Abrir en nueva pestaña',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        // ── Imagen dentro del artículo ─────────────────────────────────
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo (SEO)',
              validation: (Rule: any) =>
                Rule.custom((val: string | undefined) => {
                  if (!val || val.trim() === '') return 'Describe la imagen para mejorar SEO y accesibilidad.'
                  return true
                }).warning(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto (opcional)',
            },
          ],
        },
        // ── Nota destacada / Callout ───────────────────────────────────
        {
          type: 'object',
          name: 'callout',
          title: 'Nota destacada',
          fields: [
            {
              name: 'text',
              title: 'Texto de la nota',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'variant',
              title: 'Estilo de la nota',
              type: 'string',
              options: {
                list: [
                  { title: '💡 Consejo / Tip', value: 'tip' },
                  { title: '⚡ Destacado', value: 'highlight' },
                  { title: '⚠️ Advertencia', value: 'warning' },
                ],
                layout: 'radio',
              },
              initialValue: 'tip',
            },
          ],
          preview: {
            select: { title: 'text', subtitle: 'variant' },
            prepare({ title, subtitle }: any) {
              const icons: Record<string, string> = { tip: '💡', highlight: '⚡', warning: '⚠️' }
              return {
                title: title?.slice(0, 60) || 'Nota destacada',
                subtitle: icons[subtitle] || '💡',
              }
            },
          },
        },
        // ── CTA dentro del artículo ────────────────────────────────────
        {
          type: 'object',
          name: 'ctaBlock',
          title: 'Llamada a acción (CTA)',
          fields: [
            {
              name: 'label',
              title: 'Texto del botón',
              type: 'string',
              placeholder: 'Ej: Conoce Pure Cycling →',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Destino del enlace',
              type: 'string',
              placeholder: 'Ej: /pure-cycling o https://skool.com/...',
              validation: (Rule: any) => [
                Rule.required(),
                Rule.custom((val: string) => {
                  if (!val) return true
                  if (
                    val.startsWith('/') ||
                    val.startsWith('https://') ||
                    val.startsWith('http://')
                  ) return true
                  return 'El enlace debe comenzar con "/" (ruta interna) o "https://" (URL externa).'
                }).warning(),
              ],
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
            prepare({ title, subtitle }: any) {
              return { title: `🔗 ${title || 'CTA'}`, subtitle }
            },
          },
        },
      ],
    }),

    // ── CTA principal del artículo ─────────────────────────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'CTA principal — Texto del botón',
      type: 'string',
      placeholder: 'Ej: Conoce Pure Cycling →',
      description: 'Aparece al final del artículo. Debe completarse junto con el enlace.',
      validation: (Rule) =>
        Rule.custom((val: string | undefined, context: any) => {
          const parent = context.parent as { ctaHref?: string }
          if (!val && parent?.ctaHref)
            return 'Agrega el texto del botón porque ya completaste el enlace del CTA.'
          return true
        }).warning(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA principal — Enlace',
      type: 'string',
      placeholder: 'Ej: /pure-cycling o https://skool.com/...',
      description: 'Debe completarse junto con el texto del botón.',
      validation: (Rule) => [
        Rule.custom((val: string | undefined, context: any) => {
          const parent = context.parent as { ctaLabel?: string }
          if (!val && parent?.ctaLabel)
            return 'Agrega el enlace porque ya completaste el texto del botón del CTA.'
          return true
        }).warning(),
        Rule.custom((val: string | undefined) => {
          if (!val) return true
          if (
            val.startsWith('/') ||
            val.startsWith('https://') ||
            val.startsWith('http://')
          ) return true
          return 'El enlace debe comenzar con "/" (ruta interna) o "https://" (URL externa).'
        }).warning(),
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO — Título para buscadores',
      type: 'string',
      description: 'Si se deja vacío, se usa el título del artículo.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO — Meta descripción',
      type: 'text',
      rows: 2,
      description: 'Si se deja vacío, se usa el resumen del artículo.',
      validation: (Rule) => [
        Rule.custom((val: string | undefined) => {
          if (!val || val.trim() === '')
            return 'Si no completas la meta descripción, se usará el resumen como fallback. Recomendado: escribir una descripción SEO específica.'
          return true
        }).warning(),
        Rule.max(160).warning('La meta descripción debe tener máximo 160 caracteres para Google.'),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Palabras clave',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }: any) {
      const statusLabel: Record<string, string> = {
        draft: '📝 Borrador',
        published: '✅ Publicado',
        hidden: '🙈 Oculto',
      }
      return {
        title,
        subtitle: statusLabel[subtitle] || subtitle,
        media,
      }
    },
  },
})
