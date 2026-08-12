<script lang="ts">
  import { Badge, Button, CheckboxGroup, Icon, Link } from '$components/dsfr'
  import type { BadgeProps } from '$components/dsfr/Badge.svelte'
  import SeoHead from '$components/SEOHead.svelte'
  import { m } from '$lib/i18n/messages'
  import data from '$lib/news.json'

  type NewsKind = (typeof NEWS_KINDS)[number]
  type News = {
    kind: NewsKind
    subKind: string
    title: string
    desc: string
    imgSrc: string
    date?: number
    linkLabel?: string
    href?: string
    pinned?: boolean
  }
  type SubKindId =
    | 'comparia'
    | 'blog'
    | 'kit'
    | 'podcast'
    | 'webinar'
    | 'event'
    | 'workshop'
    | 'panel'
    | 'analyze'
    | 'press'
    | 'video'
  type Sub = {
    title: string
    variant: BadgeProps['variant']
    icon: string
    subKinds: { id: string; label: string; linkLabel?: string }[]
  }

  const NEWS_KINDS = ['resource', 'talk', 'media'] as const
  const subKind = (id: SubKindId, linkLabel?: string) => ({
    id,
    label: m[`news.subKinds.${id}`](),
    linkLabel
  })
  const SUBKINDS: Record<NewsKind, Sub> = {
    resource: {
      title: m['news.kinds.resource'](),
      variant: 'light-info',
      icon: 'i-ri-book-ai-fill',
      subKinds: [subKind('comparia'), subKind('blog'), subKind('kit')]
    },
    talk: {
      title: m['news.kinds.talk'](),
      variant: 'purple',
      icon: 'i-ri-speak-ai-fill',
      subKinds: [
        subKind('podcast', m['news.links.podcast']()),
        subKind('webinar', m['news.links.webinar']()),
        subKind('event'),
        subKind('workshop'),
        subKind('panel')
      ]
    },
    media: {
      title: m['news.kinds.media'](),
      variant: 'green-tilleul',
      icon: 'i-ri-megaphone-fill',
      subKinds: [
        subKind('analyze'),
        subKind('press', m['news.links.press']()),
        subKind('video', m['news.links.video']())
      ]
    }
  }

  const news = (data as News[]).map((n) => ({
    ...n,
    href: n.href ?? '#',
    linkLabel:
      n.linkLabel ??
      SUBKINDS[n.kind].subKinds.find((sk) => sk.id === n.subKind)?.linkLabel ??
      m['news.discover'](),
    date: n.date ? new Date(n.date * 1000) : null
  }))

  const filters = NEWS_KINDS.map((k) => ({
    id: k,
    ...SUBKINDS[k],
    legend: SUBKINDS[k].title,
    options: SUBKINDS[k].subKinds
      .map((k) => ({
        value: k.id,
        label: k.label,
        count: news.filter((n) => n.subKind === k.id).length
      }))
      .filter((opt) => opt.count > 0)
  }))

  const sortingOptions = [
    { value: 'date-desc', label: m['news.sort.dateDesc']() },
    { value: 'kind-asc', label: m['news.sort.kindAsc']() }
  ] as const

  let kinds = $state<Record<NewsKind, string[]>>({
    resource: [],
    media: [],
    talk: []
  })
  let sortingMethod = $state<'date-desc' | 'kind-asc'>('date-desc')
  const allFilters = $derived(Object.values(kinds).flat())
  const filterCount = $derived(allFilters.reduce((acc, f) => acc + (f.length ? 1 : 0), 0))
  const filteredNews = $derived.by(() => {
    return news
      .filter((n) => {
        if (allFilters.length === 0) return true

        return allFilters.some((k) => n.subKind === k)
      })
      .sort((a, b) => {
        switch (sortingMethod) {
          case 'kind-asc':
            return SUBKINDS[a.kind].title.localeCompare(SUBKINDS[b.kind].title)
          default:
            if (!a.date) return -1
            if (!b.date) return 1
            // @ts-expect-error date works
            return b.date - a.date
        }
      })
      .sort((a, b) => {
        if (a.pinned && b.pinned) return 0
        if (a.pinned) return -1
        if (b.pinned) return 1
        return 0
      })
  })

  function resetFilters(e: MouseEvent) {
    e.preventDefault()
    Object.keys(kinds).forEach((k) => (kinds[k as NewsKind].length = 0))
  }
</script>

<SeoHead title={m['seo.titles.news']()} />

<main>
  <div class="fr-container py-12">
    <h2 class="mb-7!">{m['news.title']()}</h2>

    <div class="md:flex md:flex-row">
      <aside
        class="fr-sidemenu mb-5 md:mb-0 md:basis-1/3"
        role="navigation"
        aria-labelledby="sidemenu-title"
      >
        <div class="fr-sidemenu__inner h-full">
          <button
            id="results-count"
            aria-expanded="false"
            aria-controls="fr-modal-filters-section"
            type="button"
            class="fr-sidemenu__btn"
          >
            {m['news.filters.show']()}
            {#if filterCount}
              <span class="fr-badge fr-badge--sm bg-primary! text-white! ms-2 rounded-full!">
                {filterCount}
              </span>
            {/if}
          </button>

          <div class="fr-collapse" id="fr-modal-filters-section">
            <form class="mt-8 md:mt-0">
              {#each filters as filter (filter.id)}
                <CheckboxGroup
                  {...filter}
                  bind:value={kinds[filter.id]}
                  legendClass="pb-2! px-0!"
                  labelClass="flex-nowrap!"
                  class="mb-8!"
                >
                  {#snippet legendSlot({ legend })}
                    <Badge
                      id="checkbox-{filter.id}"
                      variant={filter.variant}
                      size="md"
                      noTooltip
                      class="block w-full!"
                    >
                      <Icon icon={filter.icon} size="xs" class="me-1" />
                      {legend}
                    </Badge>
                  {/snippet}
                  {#snippet labelSlot({ option })}
                    <div class="me-2">{option.label}</div>
                    <div class="text-sm ms-auto text-[--grey-625-425]">{option.count}</div>
                  {/snippet}
                </CheckboxGroup>
              {/each}

              <div class="mb-8">
                <Button
                  text={m['news.filters.clear']()}
                  icon="delete-line"
                  variant="tertiary-no-outline"
                  disabled={filterCount === 0}
                  onclick={resetFilters}
                />
              </div>
            </form>
          </div>
        </div>
      </aside>

      <div class="basis-full">
        <p class="fr-h6 mb-4! md:hidden">
          {m['news.count']({ count: filteredNews.length })}
        </p>

        <div class="fr-select-group">
          <label class="fr-label" for="news-order">{m['news.sort.label']()}</label>
          <select
            id="news-order"
            bind:value={sortingMethod}
            name="news-order"
            class="fr-select w-auto! max-w-full"
          >
            {#each sortingOptions as option (option.value)}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div class="gap-6 md:grid-cols-2 xl:grid-cols-3 grid">
          {#each filteredNews as news (news.title)}
            <div class="fr-card fr-enlarge-link fr-card--no-border cg-border rounded-xl bg-none!">
              <div class="fr-card__body">
                <div class="fr-card__content px-5! pb-18! md:px-4! md:pt-4!">
                  <h6 class="fr-card__title mb-0! text-lg!">
                    <Link
                      href={news.href}
                      text={news.title}
                      class="after:content-none!"
                      onclick={(e) => (news.href === '#' ? e.preventDefault() : undefined)}
                    >
                      <span class="text-[--grey-50-1000]!">{news.title}</span>
                    </Link>
                  </h6>

                  <div class="fr-card__desc text-grey text-[14px]">
                    {news.desc}
                  </div>

                  <div class="fr-card__start">
                    <ul class="fr-badges-group">
                      {#if news.pinned}
                        <li class="m-0!">
                          <Badge id="card-badge-kind" variant="red" size="xs" noTooltip>
                            <Icon icon="i-ri-pushpin-fill" size="xxs" />
                          </Badge>
                        </li>
                      {/if}
                      <li>
                        <Badge
                          id="card-badge-kind"
                          variant={SUBKINDS[news.kind].variant}
                          size="xs"
                          text={SUBKINDS[news.kind].title}
                          noTooltip
                        />
                      </li>
                      <li>
                        <Badge
                          id="card-badge-kind"
                          size="xs"
                          text={!news.date ? m['news.allYear']() : news.date.toLocaleDateString()}
                          noTooltip
                          class="me-0!"
                        />
                      </li>
                    </ul>
                  </div>

                  <div class="fr-card__end pe-1!" aria-hidden="true">
                    <p class="fr-card__detail flex justify-end">
                      <Link
                        href={news.href}
                        text=""
                        class={[
                          'text-[14px]!',
                          news.href !== '#' ? 'text-primary! border-b-1' : 'text-grey!'
                        ]}
                        tabindex={-1}
                        onclick={(e) => (news.href === '#' ? e.preventDefault() : undefined)}
                      >
                        {news.linkLabel}
                        {#if news.href.startsWith('/')}
                          <Icon icon="i-ri-arrow-right-line" size="xs" />
                        {/if}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div class="fr-card__header">
                <div class="fr-card__img">
                  <img class="fr-responsive-img rounded-t-xl" src="/news/{news.imgSrc}" alt="" />
                </div>
              </div>
            </div>
          {/each}
        </div>

        {#if filteredNews.length === 0}
          <p class="fr-text--lead fr-mt-4w">
            {m['news.empty']()}
          </p>
        {/if}
      </div>
    </div>
  </div>
</main>
