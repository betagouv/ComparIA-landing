<script lang="ts">
  import { resolve } from '$app/paths'
  import { SEOHead } from '$components'
  import { m } from '$lib/i18n/messages'

  const sections = [
    { href: resolve('/'), label: m['seo.titles.home']() },
    {
      href: resolve('/product/[tab]', { tab: 'comparator' }),
      label: m['seo.titles.product'](),
      children: [
        {
          href: resolve('/product/[tab]', { tab: 'comparator' }),
          label: m['seo.titles.comparator']()
        },
        { href: resolve('/product/[tab]', { tab: 'problem' }), label: m['seo.titles.problem']() },
        {
          href: resolve('/product/[tab]', { tab: 'community' }),
          label: m['seo.titles.community']()
        },
        { href: resolve('/product/[tab]', { tab: 'history' }), label: m['seo.titles.history']() },
        { href: resolve('/product/[tab]', { tab: 'faq' }), label: m['seo.titles.faq']() },
        { href: resolve('/product/[tab]', { tab: 'partners' }), label: m['seo.titles.partners']() }
      ]
    },
    { href: resolve('/datasets'), label: m['seo.titles.datasets']() },
    {
      href: resolve('/news'),
      label: m['seo.titles.news'](),
      children: [{ href: resolve('/news/bnf'), label: m['seo.titles.bnf']() }]
    },
    { href: resolve('/duel'), label: m['seo.titles.duel']() }
  ]
</script>

<SEOHead title={m['seo.titles.sitemap']()} />

<main id="content" class="fr-container py-12">
  <h1>{m['sitemap.title']()}</h1>
  <p>{m['sitemap.desc']()}</p>

  <ul>
    {#each sections as section (section.label)}
      <li>
        <a href={section.href}>{section.label}</a>
        {#if section.children}
          <ul>
            {#each section.children as child (child.href)}
              <li><a href={child.href}>{child.label}</a></li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
  </ul>
</main>
