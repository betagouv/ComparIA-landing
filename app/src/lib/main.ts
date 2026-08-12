import { setLocale, type Locale } from './i18n/runtime'

export type LocaleOption = { code: Locale; short: string; long: string; host?: string }
type AnyLocale = (typeof ALL_LOCALES)[number]['code']

export const ARENA_URL = '/arena' as const
export const ALL_LOCALES = [
  { code: 'fr', short: 'FR', long: 'FR - Français' },
  { code: 'en', short: 'EN', long: 'EN - English' },
  { code: 'da' as Locale, short: 'DA', long: 'DA - Dansk', host: 'https://ai-arenaen.dk' }
] satisfies LocaleOption[]
export const CONTACT_URL = 'contact@comparia.beta.gouv.fr'

export function onLocaleChange(locale: AnyLocale) {
  const localeData = ALL_LOCALES.find((loc) => loc.code === locale)
  if (localeData?.host) {
    window.open(localeData?.host, '_blank')!.focus()
  } else {
    setLocale(locale as Locale)
  }
}
