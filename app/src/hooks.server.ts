import { env } from '$env/dynamic/private'
import { paraglideMiddleware } from '$lib/i18n/server'
import type { Handle } from '@sveltejs/kit'

const MATOMO_ID = env.MATOMO_ID || ''
const MATOMO_URL = env.MATOMO_URL || ''

const MATOMO_BLOCK = /<!-- Matomo -->[\s\S]*?<!-- End Matomo Code -->/

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request

    return resolve(event, {
      transformPageChunk: ({ html }) => {
        const page = html
          .replaceAll('%lang%', locale)
          .replace('%scheme%', event.cookies.get('scheme') || 'system')
          .replace('%theme%', event.cookies.get('theme') || 'system')

        // Without both settings the tracker only produces 404s, so drop it entirely.
        if (!MATOMO_ID || !MATOMO_URL) return page.replace(MATOMO_BLOCK, '')

        return page.replaceAll('%matomo_id%', MATOMO_ID).replaceAll('%matomo_url%', MATOMO_URL)
      }
    })
  })

export const handle: Handle = handleParaglide
