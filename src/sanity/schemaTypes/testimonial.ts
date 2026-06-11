import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Rol / descripción',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'País',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Texto del testimonio',
      type: 'text',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del video',
      type: 'string',
      description: 'Ruta interna (/videos/...) o URL externa (https://...)',
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true
          if (
            val.startsWith('/') ||
            val.startsWith('http://') ||
            val.startsWith('https://')
          )
            return true
          return 'La URL del video debe comenzar con /, http:// o https://'
        }).warning(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster / imagen previa',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (SEO)',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((val) => {
              if (!val) return 'Agrega un texto alternativo para la imagen'
              return true
            }).warning(),
        }),
      ],
    }),
    defineField({
      name: 'posterUrl',
      title: 'URL del poster existente',
      type: 'string',
      description:
        'Permite usar imágenes existentes en /public/images/... sin subirlas a Sanity.',
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true
          if (
            val.startsWith('/') ||
            val.startsWith('http://') ||
            val.startsWith('https://')
          )
            return true
          return 'La URL del poster debe comenzar con /, http:// o https://'
        }).warning(),
    }),
    defineField({
      name: 'page',
      title: 'Página',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Pure Cycling', value: 'pure-cycling' },
          { title: 'Bike & Bed Hotels', value: 'bike-bed' },
          { title: 'PuroMTB', value: 'puromtb' },
        ],
        layout: 'radio',
      },
      initialValue: 'pure-cycling',
      validation: (Rule) => Rule.required().error('La página es obligatoria.'),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      description: 'Menor número = aparece primero.',
    }),
    defineField({
      name: 'isActive',
      title: 'Activo',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      const d = doc as { quote?: string; videoUrl?: string } | undefined
      if (!d?.quote && !d?.videoUrl) {
        return 'Agrega al menos un texto de testimonio o una URL de video'
      }
      return true
    }).warning(),
  preview: {
    select: {
      title: 'name',
      subtitle: 'page',
      media: 'posterImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Testimonio sin nombre',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
