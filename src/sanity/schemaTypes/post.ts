import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  fields: [
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
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      placeholder: 'Ej: Ciclismo — Entrenamiento',
    }),
    defineField({
      name: 'summary',
      title: 'Resumen del artículo',
      type: 'text',
      rows: 3,
      description: 'Texto corto para la tarjeta del blog y SEO. No se muestra como bloque dentro del artículo.',
    }),
    defineField({
      name: 'readingTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
    }),
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
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Artículo destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Contenido del artículo',
      type: 'array',
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
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', '/'] }),
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
              placeholder: 'Ej: /pure-cycling',
              validation: (Rule: any) => Rule.required(),
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
    // ── CTA principal del artículo ─────────────────────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'CTA principal — Texto del botón',
      type: 'string',
      placeholder: 'Ej: Conoce Pure Cycling →',
      description: 'Aparece al final del artículo.',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA principal — Enlace',
      type: 'string',
      placeholder: 'Ej: /pure-cycling',
    }),
    // ── SEO ────────────────────────────────────────────────────────────
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
