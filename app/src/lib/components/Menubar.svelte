<script lang="ts">
  import { resolve } from '$app/paths'
  import { page } from '$app/state'
  import { m } from '$lib/i18n/messages'
  import { ARENA_URL } from '$lib/main'

  // Navigation links for both desktop and mobile menus.
  // The model list and the ranking are pages of the arena app, not of this site.
  const navLinks = (
    [
      { href: resolve('/'), label: m['seo.titles.home']() },
      { href: resolve('/product'), label: m['seo.titles.product']() },
      { href: `${ARENA_URL}/models`, label: m['seo.titles.modeles'](), arena: true },
      { href: `${ARENA_URL}/ranking`, label: m['seo.titles.ranking'](), arena: true },
      { href: resolve('/datasets'), label: m['seo.titles.datasets']() },
      { href: resolve('/news'), label: m['seo.titles.news']() }
    ] as const
  ).map(({ href, label, ...link }) => ({
    label,
    arena: 'arena' in link,
    props: {
      href,
      // The arena may be served from another origin, and is then a new window
      target: href.startsWith('http') ? '_blank' : '_self',
      rel: href.startsWith('http') ? 'noopener external' : undefined
    }
  }))

  function isCurrentPage(path: string, href: string) {
    if (path.includes('product')) return href.includes('product')
    if (path.includes('news')) return href.includes('news')
    return path === href
  }
</script>

<nav class="fr-nav" data-fr-js-navigation="true">
  <ul class="fr-nav__list fr-container">
    {#each navLinks as link (link.props.href)}
      <li class="fr-nav__item" data-fr-js-navigation-item="true">
        <a
          {...link.props}
          aria-controls="modal-header__menu"
          class="fr-nav__link"
          aria-current={!link.arena && isCurrentPage(page.url.pathname, link.props.href)
            ? 'true'
            : undefined}
          data-fr-js-modal-button="true"
        >
          {link.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
