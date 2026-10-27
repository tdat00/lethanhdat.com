import type { APIRoute } from 'astro'

import { createFeed } from '@/utils/rss'

// The previous Jekyll site published its feed here.
export const GET: APIRoute = ({ site }) => createFeed('en', site!)
