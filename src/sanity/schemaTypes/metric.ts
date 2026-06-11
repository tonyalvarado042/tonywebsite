import { defineType, defineField } from 'sanity'

export const metricType = defineType({
  name: 'metric',
  title: 'Métricas',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Valor',
      type: 'string',
      placeholder: 'Ej: 22+, 400K, +30',
      validation: (Rule) => Rule.required().error('El valor de la métrica es obligatorio.'),
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      placeholder: 'Ej: Años de trayectoria',
      validation: (Rule) => Rule.required().error('La etiqueta de la métrica es obligatoria.'),
    }),
    defineField({
      name: 'color',
      title: 'Color visual',
      type: 'string',
      options: {
        list: [
          { title: 'Dorado', value: 'gold' },
          { title: 'Blanco', value: 'text' },
          { title: 'Verde', value: 'green' },
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (Rule) => Rule.required().error('El color es obligatorio.'),
    }),
    defineField({
      name: 'page',
      title: 'Página',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
        ],
        layout: 'radio',
      },
      initialValue: 'home',
      validation: (Rule) => Rule.required().error('La página de destino es obligatoria.'),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      validation: (Rule) =>
        Rule.custom((val) => {
          if (val === undefined || val === null)
            return 'Define el orden para controlar la posición de esta métrica.'
          return true
        }).warning(),
    }),
    defineField({
      name: 'isActive',
      title: 'Activo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
})
