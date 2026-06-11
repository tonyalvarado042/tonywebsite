import type { SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { metricType } from './metric'

export const schemaTypes: SchemaTypeDefinition[] = [postType, metricType]
