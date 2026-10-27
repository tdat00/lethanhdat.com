import type { APIRoute } from 'astro'

import { createFeed } from '@/utils/rss'

export const GET: APIRoute = ({ site }) => createFeed('en', site!)
