import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'delivery-app',

  projectId: 'c8cxjidd',
  dataset: 'production',

  plugins: [structureTool(), visionTool({
    defaultApiVersion: '2026-10-30',
  })],

  schema: {
    types: schemaTypes,
  },
})
