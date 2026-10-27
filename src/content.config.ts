import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const removeDupsAndLowerCase = (tags: string[]) => [...new Set(tags.map((tag) => tag.toLowerCase()))]

// Posts live in `src/content/blog/<locale>/<slug>.md`. A post and its translation share the slug.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Social card, as a path under `public/`.
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    draft: z.boolean().default(false),
    pin: z.boolean().optional()
  })
})

export const collections = { blog }
