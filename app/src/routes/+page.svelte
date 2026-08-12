<script lang="ts">
  import { SEOHead } from '$components'
  import { Accordion, AccordionGroup, Button, Icon, Link } from '$components/dsfr'
  import { env } from '$env/dynamic/public'
  import { m } from '$lib/i18n/messages'
  import { getLocale, locales } from '$lib/i18n/runtime'
  import { ARENA_URL, CONTACT_URL } from '$lib/main'
  import { externalLinkProps, sanitize } from '$lib/utils'
  import type { HTMLImgAttributes } from 'svelte/elements'
  import { HowItWorks, Newsletter } from './components'

  const locale = getLocale()

  if (env.PUBLIC_GIT_COMMIT) console.log(`Git commit: ${env.PUBLIC_GIT_COMMIT}`)

  function handleRedirect() {
    window.location.href = ARENA_URL
  }

  const localeOrDefault = $derived(locales.includes(locale) ? locale : 'en')
  const utilyCards = $derived(
    (
      [
        {
          i18nKey: 'compare',
          src: `/home/comparer-${localeOrDefault}.webp`,
          srcDark: `/home/comparer-dark-${localeOrDefault}.webp`
        },
        { i18nKey: 'test', src: '/home/tester.webp', srcDark: '/home/tester-dark.webp' },
        {
          i18nKey: 'measure',
          src: `/home/mesurer-${localeOrDefault}.webp`,
          srcDark: `/home/mesurer-dark-${localeOrDefault}.webp`
        }
      ] as const
    ).map(({ i18nKey, ...card }) => ({
      ...card,
      title: m[`home.use.${i18nKey}.title`](),
      desc: m[`home.use.${i18nKey}.desc`](),
      alt: m[`home.use.${i18nKey}.alt`]()
    }))
  )

  const europeCards = [
    {
      title: '/compar:IA',
      link: ARENA_URL,
      desc: m['home.europe.languages.fr'](),
      flag: '🇫🇷'
    },
    {
      title: '/palyginti:AI',
      link: '',
      desc: m['home.europe.languages.lt'](),
      flag: '🇱🇹'
    },
    {
      title: '/jämföra:AI',
      link: '',
      desc: m['home.europe.languages.sv'](),
      flag: '🇸🇪'
    },
    {
      title: '/AI-Arenaen',
      link: 'https://ai-arenaen.dk/',
      desc: m['home.europe.languages.da'](),
      flag: '🇩🇰'
    }
  ]

  const whyVoteCards = (
    [
      { i18nKey: 'prefs', src: '/home/prefs.svg' },
      { i18nKey: 'datasets', src: '/home/datasets.svg' },
      { i18nKey: 'finetune', src: '/home/finetune.svg' }
    ] as const
  ).map(({ i18nKey, ...card }) => ({
    ...card,
    title: m[`home.vote.steps.${i18nKey}.title`](),
    desc: m[`home.vote.steps.${i18nKey}.desc`]()
  }))

  const usageCards = (
    [
      { i18nKey: 'use', icon: 'i-ri-database-line' },
      { i18nKey: 'explore', icon: 'i-ri-search-line' },
      { i18nKey: 'educate', icon: 'i-ri-presentation-line' }
    ] as const
  ).map(({ i18nKey, ...card }) => ({
    ...card,
    title: m[`home.usage.${i18nKey}.title`](),
    desc: m[`home.usage.${i18nKey}.desc`]()
  }))

  const logos = [
    {
      class: 'max-h-[95px]',
      src: '/orgs/minicult.svg',
      alt: 'Ministère de la Culture',
      title: 'Ministère de la Culture'
    },
    {
      class: 'max-h-[95px] dark:invert',
      src: '/orgs/ateliernumerique.webp',
      alt: 'Atelier numérique',
      title: 'Atelier numérique'
    },
    {
      // The logo is blue on solid white, so it needs a light backing in dark mode
      class: 'max-w-[190px] self-center dark:bg-white dark:p-1',
      src: '/orgs/alt-edic.webp',
      alt: 'ALT-EDIC',
      title: 'Alliance for Language Technologies (ALT-EDIC)'
    }
  ] satisfies HTMLImgAttributes[]

  const reducedFAQ = (
    [
      { id: 'usage', index: '2' },
      { id: 'models', index: '1' },
      { id: 'datasets', index: '2' },
      { id: 'ecology', index: '1' },
      { id: 'i18n', index: '1' }
    ] as const
  ).map(({ id, index }) => ({
    id,
    title: m[`faq.${id}.questions.${index}.title`](),
    desc: m[`faq.${id}.questions.${index}.desc`]()
  }))
</script>

<SEOHead />

<main id="content" class="">
  <section class="fr-container--fluid bg-light-grey pb-13 lg:pt-18 pt-10 lg:pb-28">
    <div
      class="fr-container gap-20 md:flex-row md:items-center md:gap-0 flex max-w-[1070px]! flex-col"
    >
      <div class="">
        <div class="mb-15 px-4 md:px-0">
          <div class="mb-10 md:w-[320px] md:max-w-[320px] max-w-[280px]">
            <h1 class="mb-5!">
              {@html sanitize(m['home.intro.title']({ props: 'class="text-primary"' }))}
            </h1>
            <p>{m['home.intro.desc']()}</p>
          </div>
        </div>

        <Button
          id="start_arena_btn"
          type="submit"
          text={m['header.startDiscussion']()}
          size="lg"
          class="md:max-w-[355px] w-full!"
          onclick={handleRedirect}
        />
      </div>
      <div class="bg-light-grey px-4 md:me-0 md:px-0 m-auto max-w-[545px] grow">
        <HowItWorks />
      </div>
    </div>
  </section>

  <section class="fr-container--fluid md:py-15 py-10">
    <div class="fr-container">
      <h3 class="mb-3! text-center">{m['home.use.title']()}</h3>
      <p class="mb-8! text-grey text-center">{m['home.use.desc']()}</p>

      <div class="gap-7 md:grid-cols-3 grid">
        {#each utilyCards as card, i (i)}
          <div class="cg-border">
            <img
              loading="lazy"
              decoding="async"
              src={card.src}
              alt={card.alt}
              class="fr-responsive-img bg-light-grey sm:max-h-2/3 md:max-h-1/3 lg:max-h-1/2 xl:max-h-3/5 rounded-t-xl h-full! max-h-3/5 object-contain dark:hidden"
            />
            <img
              loading="lazy"
              decoding="async"
              src={card.srcDark}
              alt={card.alt}
              class="fr-responsive-img bg-light-grey sm:max-h-2/3 md:max-h-1/3 lg:max-h-1/2 xl:max-h-3/5 rounded-t-xl hidden h-full! max-h-3/5 object-contain dark:block"
            />
            <div class="px-5 pb-7 pt-4 md:px-8 md:pb-10 md:pt-5">
              <h6 class="mb-1! md:mb-2!">{card.title}</h6>
              <p class="mb-0! text-grey">{card.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- FIXME remove hidden? -->
  <section
    id="european"
    class="fr-container--fluid bg-light-info pb-18 lg:pb-25 pt-10 lg:pt-20 hidden"
  >
    <div class="fr-container gap-8 lg:flex-row lg:items-center flex max-w-[1150px]! flex-col">
      <div class="lg:max-w-[360px]">
        <h3 class="fr-h2 mb-4! max-w-[320px]">
          {@html sanitize(m['home.europe.title']({ props: 'class="text-primary"' }))}
        </h3>
        <p class="mb-2!">{m['home.europe.desc']()}</p>
        <p><strong class="block">{m['home.europe.question']()}</strong></p>

        <Link
          button
          size="lg"
          href="mailto:{CONTACT_URL}"
          text={m['actions.contactUs']()}
          class="sm:w-auto! w-full!"
        />
      </div>

      <div
        class="py-15 gap-8 rounded-xl bg-white px-9 xl:flex-row flex w-full flex-col justify-center"
      >
        <img
          loading="lazy"
          decoding="async"
          src="/home/comparia-stars.webp"
          aria-hidden="true"
          alt=""
          class="xl:m-0 m-auto max-w-[180px] object-contain"
        />

        <div class="gap-4 sm:grid-cols-2 xl:gap-8 grid">
          {#each europeCards as card, i (i)}
            <div class="cg-border bg-very-light-grey gap-4 px-4 py-5 flex items-center">
              <div class="bg-light-info rounded-md p-2 leading-none">
                {card.flag}
              </div>
              <div>
                <Link
                  href={card.link}
                  variant="primary"
                  native={false}
                  text={card.title}
                  size="sm"
                />
                <p class="fr-message mb-0!">{card.desc}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section class="fr-container--fluid bg-very-light-grey py-10 lg:py-14">
    <div class="fr-container">
      <div class="cg-border xl:p-13! bg-white px-4 py-10">
        <h4 class="mb-2! text-center">{m['home.vote.title']()}</h4>
        <p class="text-grey text-center">{m['home.vote.desc']()}</p>

        <div class="md:mt-13 mt-10 lg:flex-row flex flex-col text-center">
          {#each whyVoteCards as card, index (index)}
            <div class="basis-1/3">
              <div>
                <img
                  loading="lazy"
                  decoding="async"
                  src={card.src}
                  alt={card.title}
                  width="72"
                  height="72"
                  class="mb-4 m-auto"
                />
                <!-- Reserve two lines so the three columns line up whatever the language -->
                <h6 class="mb-1! mx-auto! lg:min-h-[2lh] max-w-[230px]">{card.title}</h6>
              </div>
              <p class="text-sm! text-grey m-auto! max-w-[280px]">{card.desc}</p>
            </div>
            {#if index < 2}
              <div class="arrow my-5 xl:-me-12 xl:-ms-12 relative shrink-0"></div>
            {/if}
          {/each}
        </div>

        <div class="lg:mt-19 mt-12 flex justify-center">
          <Link
            button
            hideExternalIcon
            size="lg"
            href="https://huggingface.co/collections/comparIA/jeux-de-donnees-compar-ia-67644adf20912236342c3f3b"
            text={m['home.vote.datasetAccess']()}
          />
        </div>
      </div>
    </div>
  </section>

  <section class="fr-container--fluid bg-light-grey py-10 lg:py-20">
    <div class="fr-container">
      <h3 class="mb-2! text-center">{m['home.usage.title']()}</h3>
      <p class="fr-mb-4w text-grey text-center">{m['home.vote.desc']()}</p>

      <div class="gap-8 md:grid-cols-3 grid">
        {#each usageCards as card, i (i)}
          <div class="cg-border bg-white p-5 lg:px-8 lg:pb-11 lg:pt-6">
            <Icon icon={card.icon} size="lg" block class="text-primary mb-4" />
            <h6 class="mb-2!">{card.title}</h6>
            <p class="mb-0! text-grey">{card.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="fr-container--fluid bg-very-light-grey lg:pb-38 py-12 lg:pt-20">
    <div class={['fr-container gap-10 lg:gap-6 grid', locale === 'fr' && 'lg:grid-cols-2']}>
      <div class="cg-border bg-white px-5 py-10 md:px-8">
        <h5>{m['home.origin.team.title']()}</h5>
        <p>{m['home.origin.team.desc']()}</p>
        <p>
          {@html sanitize(
            m['home.origin.team.funding']({
              betaProps: externalLinkProps('https://beta.gouv.fr'),
              altEdicProps: externalLinkProps('https://www.alt-edic.eu')
            })
          )}
        </p>

        <div class="mt-12 gap-8 flex flex-wrap items-center">
          {#each logos as logoProps, i (i)}
            <img loading="lazy" decoding="async" {...logoProps} />
          {/each}
          <!-- DSFR draws the official block from text, so DINUM needs no image file -->
          <p class="fr-logo fr-logo--sm mb-0!" title="Direction interministérielle du numérique">
            Direction interministérielle<br />du numérique
          </p>
        </div>
      </div>

      {#if locale === 'fr'}
        <Newsletter />
      {/if}
    </div>
  </section>

  <section class="fr-container--fluid pb-18 lg:pb-25 pt-10 lg:pt-20">
    <div class="fr-container">
      <h3 class="mb-8! lg:mb-10! text-center">{m['home.faq.title']()}</h3>

      <AccordionGroup>
        {#each reducedFAQ as q (q.id)}
          <Accordion id={q.id} label={q.title}>
            {@html sanitize(q.desc)}
          </Accordion>
        {/each}
      </AccordionGroup>

      <div class="mt-8 lg:mt-11 text-center">
        <Link button size="lg" href="/product/faq" text={m['home.faq.discover']()} />
      </div>
    </div>
  </section>

  <div class="mb-8 text-center">
    <Link href="#" text={m['actions.backToTop']()} icon="arrow-up-line" class="pb-1!" />
  </div>
</main>

<style lang="postcss">
  .arrow {
    height: 62px;
    width: 16px;
    background-image: url('/home/arrow-h-mobile.svg');
    left: calc(50% - 8px);

    @media (min-width: 62em) {
      & {
        height: 16px;
        width: 72px;
        /* Crop the tail rather than scale, so the head keeps its size */
        background-image: url('/home/arrow-h.svg');
        background-position: right center;
        background-repeat: no-repeat;
        left: 0;
        margin-top: 110px;
      }
    }
  }
</style>
