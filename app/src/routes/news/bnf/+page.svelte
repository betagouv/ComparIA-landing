<script lang="ts">
  import { Badge, Icon, Link } from '$components/dsfr'
  import SeoHead from '$components/SEOHead.svelte'
  import { m } from '$lib/i18n/messages'
  import { sanitize } from '$lib/utils'

  const talks = (
    [
      {
        i18nKey: 'opening',
        desc: 'Isabelle Nyffenegger, Thibault Grouas & Lucie Termignon',
        youtubeSrc: 'https://www.youtube-nocookie.com/embed/wnKNu_eW7Cc'
      },
      {
        i18nKey: 'alignment',
        desc: 'Anastasia Stasenko, Pleias',
        youtubeSrc: 'https://www.youtube-nocookie.com/embed/3ayf__MTFzA'
      },
      {
        i18nKey: 'democracy',
        desc: 'David Mas, Make.org & Benjamin Piwowarski, CNRS',
        youtubeSrc: 'https://www.youtube-nocookie.com/embed/jdALqhnRmCk'
      },
      {
        i18nKey: 'footprint',
        desc: 'Samuel Rincé, GenAI Impact',
        youtubeSrc: 'https://www.youtube-nocookie.com/embed/i7IAJUzjk0c'
      },
      {
        i18nKey: 'education',
        desc: 'Marie Bancal & Françoise Tort, Pix',
        youtubeSrc: 'https://www.youtube-nocookie.com/embed/1oMLenKEhgk'
      },
      {
        i18nKey: 'future',
        desc: 'Sasha Luccioni, Hugging Face',
        youtubeSrc: 'https://www.youtube-nocookie.com/embed/kktVcBSkIIY'
      }
    ] as const
  ).map(({ i18nKey, ...talk }) => ({ ...talk, title: m[`news.bnf.talks.${i18nKey}`]() }))

  const workshops = (
    [
      { i18nKey: 'battle', desc: 'Margaux Levisalles, Latitudes', time: '11h - 11h45' },
      { i18nKey: 'blackbox', desc: 'Loup Cellard, Datactivist', time: '13h - 13h45' },
      { i18nKey: 'modulix', desc: 'Romain Pennec, Pix', time: '14h - 14h45' },
      {
        i18nKey: 'cafeia',
        desc: 'Jean Cattan, Conseil national du numérique',
        time: '15h - 15h45'
      },
      { i18nKey: 'consultation', desc: 'Victor Laymand, Make.org', time: '15h45 - 16h30' }
    ] as const
  ).map(({ i18nKey, ...workshop }) => ({
    ...workshop,
    title: m[`news.bnf.workshops.${i18nKey}`]()
  }))

  const speakers = (
    [
      {
        i18nKey: 'bancal',
        name: 'Marie Bancal',
        img: '/news/bnf/marie-bancal.webp',
        logos: [{ src: '/orgs/pix.svg', invert: false, alt: 'Pix', width: 100 }]
      },
      {
        i18nKey: 'bras',
        name: 'Mathilde Bras',
        img: '/news/bnf/mathilde-bras.webp',
        logos: [
          {
            src: '/orgs/ateliernumerique.webp',
            invert: true,
            alt: 'Atelier numérique',
            width: 100
          },
          { src: '/orgs/minicult.svg', invert: false, alt: 'Ministère de la Culture', width: 110 }
        ]
      },
      {
        i18nKey: 'levisalles',
        name: 'Margaux Levisalles',
        img: '/news/bnf/margaux-levisalles.webp',
        logos: [{ src: '/orgs/latitudes.webp', invert: true, alt: 'Latitudes', width: 150 }]
      },
      {
        i18nKey: 'cattan',
        name: 'Jean Cattan',
        img: '/news/bnf/jean-cattan.webp',
        logos: [
          {
            src: '/orgs/cnnum.webp',
            invert: true,
            alt: 'Conseil national du numérique',
            width: 100
          }
        ]
      },
      {
        i18nKey: 'cellard',
        name: 'Loup Cellard',
        img: '/news/bnf/loup-cellard.webp',
        logos: [{ src: '/orgs/datactivist.webp', invert: true, alt: 'Datactivist', width: 150 }]
      },
      {
        i18nKey: 'delassus',
        name: 'Romain Delassus',
        img: '/news/bnf/romain-delassus.webp',
        logos: [
          { src: '/orgs/minicult.svg', invert: false, alt: 'Ministère de la Culture', width: 110 }
        ]
      },
      {
        i18nKey: 'laymand',
        name: 'Victor Laymand',
        img: '/news/bnf/victor-laymand.webp',
        logos: [{ src: '/orgs/make-org.svg', invert: false, alt: 'Make.org', width: 100 }]
      },
      {
        i18nKey: 'luccioni',
        name: 'Sasha Luccioni',
        img: '/news/bnf/sasha-luccioni.webp',
        logos: [
          { src: '/orgs/huggingface-full.svg', invert: false, alt: 'Hugging Face', width: 160 }
        ]
      },
      {
        i18nKey: 'mas',
        name: 'David Mas',
        img: '/news/bnf/david-mas.webp',
        logos: [{ src: '/orgs/make-org.svg', invert: false, alt: 'Make.org', width: 100 }]
      },
      {
        i18nKey: 'piwowarski',
        name: 'Benjamin Piwowarski',
        img: '/news/bnf/benjamin-piwowarski.webp',
        logos: [{ src: '/orgs/cnrs.svg', invert: false, alt: 'CNRS', width: 110 }]
      },
      {
        i18nKey: 'rince',
        name: 'Samuel Rincé',
        img: '/news/bnf/samuel-rince.webp',
        logos: [{ src: '/orgs/genai.webp', invert: true, alt: 'GenAI Impact', width: 130 }]
      },
      {
        i18nKey: 'stasenko',
        name: 'Anastasia Stasenko',
        img: '/news/bnf/anastasia-stasenko.webp',
        logos: [{ src: '/orgs/pleias.webp', invert: false, alt: 'Pleias', width: 130 }]
      },
      {
        i18nKey: 'termignon',
        name: 'Lucie Termignon',
        img: '/news/bnf/lucie-termignon.webp',
        logos: [
          { src: '/orgs/comparia.svg', invert: false, alt: 'compar:IA', width: 80 },
          { src: '/orgs/minicult.svg', invert: false, alt: 'Ministère de la Culture', width: 110 }
        ]
      },
      {
        i18nKey: 'tort',
        name: 'Françoise Tort',
        img: '/news/bnf/francoise-tort.webp',
        logos: [{ src: '/orgs/pix.svg', invert: false, alt: 'Pix', width: 100 }]
      }
    ] as const
  ).map(({ i18nKey, ...speaker }) => ({ ...speaker, desc: m[`news.bnf.speakers.${i18nKey}`]() }))
</script>

<SeoHead title={m['seo.titles.bnf']()} />

<main id="content">
  <section class="fr-container--fluid bg-very-light-grey pb-16 pt-8 md:pt-16">
    <div class="fr-container gap-16 md:grid-cols-2 grid items-center">
      <div class="mx-auto max-w-[470px]">
        <img
          class="mb-4"
          src="/iasummit.webp"
          alt={m['news.bnf.logoAlt']()}
          title={m['news.bnf.logoAlt']()}
        />
        <h1>
          {@html sanitize(m['news.bnf.title']({ props: 'class="text-primary"' }))}
        </h1>
        <p class="mb-8!">{m['news.bnf.desc']()}</p>
        <Link
          button
          href="https://www.youtube.com/playlist?list=PLtRFEzn7EZGIadxkQgxgDdJ0te-U-iRzx"
          text={m['news.bnf.cta']()}
          size="lg"
          class="w-full!"
        />
      </div>
      <div>
        <img
          src="/news/bnf/cover.webp"
          alt={m['news.bnf.coverAlt']()}
          title={m['news.bnf.coverAlt']()}
          class="fr-responsive-img rounded-xl"
        />
      </div>
    </div>
  </section>

  <section class="bg-light-grey py-15">
    <div class="fr-container">
      <h3 class="text-center">{m['news.bnf.talks.title']()}</h3>

      <div class="gap-8 md:grid-cols-2 grid">
        {#each talks as talk, i (i)}
          <div class="cg-border bg-white p-6">
            <iframe
              loading="lazy"
              width="100%"
              src={talk.youtubeSrc}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              class="aspect-video"
            ></iframe>

            <h4 class="mt-4!">{talk.title}</h4>
            <p class="text-grey">{talk.desc}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="fr-container pt-15">
      <h3 class="my-12! text-center">{m['news.bnf.workshops.title']()}</h3>

      <div class="gap-6 grid grid-cols-3">
        {#each workshops as workshop, i (i)}
          <div class="cg-border bg-white p-6">
            <div class="mb-4 flex items-center">
              <p class="mb-0! text-sm! text-grey inline-flex">
                <Icon icon="i-ri-time-line" size="sm" block class="me-1" />
                {workshop.time}
              </p>
              <Badge
                variant="yellow"
                text={m['news.bnf.workshops.badge']()}
                size="sm"
                class="ms-auto"
              />
            </div>

            <h6 class="mb-3!">{workshop.title}</h6>
            <p class="text-sm! text-grey">{workshop.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-15">
    <h3 class="text-center">{m['news.bnf.speakers.title']()}</h3>
    <div class="fr-container gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid">
      {#each speakers as speaker (speaker.name)}
        <div class="cg-border bg-light-grey p-7 flex flex-col">
          <img loading="lazy" decoding="async" class="rounded-lg w-full" src={speaker.img} alt="" />
          <h6 class="my-2!">{speaker.name}</h6>
          <p class="text-sm! text-grey">{speaker.desc}</p>

          <div class="gap-2 mt-auto flex flex-wrap">
            {#each speaker.logos as logo, i (`${speaker.name}-${i}`)}
              <img
                loading="lazy"
                decoding="async"
                src={logo.src}
                width={logo.width ?? 100}
                alt={logo.alt}
                title={logo.alt}
                class={logo.invert ? 'dark:invert' : ''}
              />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="bg-light-grey flex flex-col items-center">
    <div class="fr-container md:w-1/2!">
      <h4 class="mt-12! text-center">{m['news.bnf.about.title']()}</h4>
      <p class="text-center">{m['news.bnf.about.event']()}</p>
      <p class="text-center">{m['news.bnf.about.goal']()}</p>
      <p class="mb-8! text-center">{m['news.bnf.about.thanks']()}</p>
    </div>

    <div
      class="fr-container mb-12! gap-6 flex max-w-full flex-wrap justify-center *:max-h-[100px] *:object-contain"
    >
      <img
        loading="lazy"
        decoding="async"
        src="/orgs/minicult.svg"
        alt="Ministère de la Culture"
        title="Ministère de la Culture"
      />
      <img
        loading="lazy"
        decoding="async"
        src="/orgs/ateliernumerique.webp"
        alt="Atelier numérique"
        title="Atelier numérique"
        class="dark:invert"
      />
      <img
        src="/iasummit.webp"
        alt={m['news.bnf.logoAlt']()}
        title={m['news.bnf.logoAlt']()}
        class="dark:invert"
      />
      <img
        loading="lazy"
        decoding="async"
        src="/orgs/betagouv.svg"
        alt="beta.gouv.fr"
        title="beta.gouv.fr"
        class="dark:invert"
      />
      <img
        loading="lazy"
        decoding="async"
        src="/orgs/bnf.svg"
        class="max-w-[100px] dark:invert"
        alt="BNF"
        title="BNF"
      />
    </div>
  </section>
</main>
