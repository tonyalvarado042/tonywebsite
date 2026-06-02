// This config is used by the hosted Sanity Studio at https://pwq90id0.sanity.studio
// It is NOT imported by Next.js pages — only referenced when deploying the studio separately.
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'tony-alvarado-cms',
  title: 'Tony Alvarado CMS',
  projectId: 'pwq90id0',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
