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
        {
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'H2 — Sección', value: 'h2' },
            { title: 'H3 — Subsección', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Cita destacada', value: 'blockquote' },
          ],
          lists: [
            { title: 'Lista con viñetas', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
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
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA — Texto del botón',
      type: 'string',
      placeholder: 'Ej: Conoce Pure Cycling →',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA — Destino del enlace',
      type: 'string',
      placeholder: 'Ej: /pure-cycling',
    }),
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
    prepare({ title, subtitle, media }) {
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
