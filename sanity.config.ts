// This config is used by the hosted Sanity Studio at https://pwq90id0.sanity.studio
// It is NOT imported by Next.js pages — only referenced when deploying the studio separately.
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'

// Types hidden from the editorial UI (metric, testimonial) remain registered in the schema
// so that existing GROQ queries in the Next.js frontend continue to work.
const HIDDEN_TYPES = ['metric', 'testimonial']

export default defineConfig({
  name: 'tony-alvarado-cms',
  title: 'Tony Alvarado CMS',
  projectId: 'pwq90id0',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Artículo de Blog')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Artículos de Blog')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((opt) => !HIDDEN_TYPES.includes(opt.templateId)),
  },
})
