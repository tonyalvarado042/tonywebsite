import type { SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { metricType } from './metric'
import { testimonialType } from './testimonial'

export const schemaTypes: SchemaTypeDefinition[] = [postType, metricType, testimonialType]
