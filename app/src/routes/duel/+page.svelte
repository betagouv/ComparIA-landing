<script lang="ts">
  import { SEOHead } from '$components'
  import { Accordion, AccordionGroup, Icon, Link } from '$components/dsfr'
  import { m } from '$lib/i18n/messages'
  import { sanitize } from '$lib/utils'

  const KIT_URL = 'https://formulaire.beta.numerique.gouv.fr/duels-de-l-ia'

  const formatPoints = ['duration', 'place', 'access', 'turnkey'] as const
  const guidePoints = ['walkthrough', 'slides', 'faq', 'extension'] as const

  const publicCards = (
    [
      { i18nKey: 'schools', icon: 'i-ri-school-line', variant: 'text-yellow' },
      { i18nKey: 'universities', icon: 'i-ri-graduation-cap-fill', variant: 'text-red' },
      { i18nKey: 'associations', icon: 'i-ri-home-smile-2-line', variant: 'text-green' },
      { i18nKey: 'companies', icon: 'i-ri-building-4-line', variant: 'text-primary' }
    ] as const
  ).map(({ i18nKey, ...card }) => ({
    ...card,
    title: m[`duel.publics.${i18nKey}.title`](),
    desc: m[`duel.publics.${i18nKey}.desc`]()
  }))

  const workshopSteps = (['intro', 'duel', 'vote', 'reveal', 'debate', 'conclusion'] as const).map(
    (i18nKey) => ({
      title: m[`duel.steps.${i18nKey}.title`](),
      duration: m[`duel.steps.${i18nKey}.duration`](),
      desc: m[`duel.steps.${i18nKey}.desc`]()
    })
  )

  const faq = (['size', 'expertise', 'duration'] as const).map((i18nKey) => ({
    title: m[`duel.faq.${i18nKey}.title`](),
    desc: m[`duel.faq.${i18nKey}.desc`]()
  }))
</script>

<SEOHead title={m['seo.titles.duel']()} />

<main>
  <section class="fr-container--fluid bg-very-light-grey py-15">
    <div class="fr-container">
      <div class="gap-10 md:grid-cols-2 lg:px-20 grid">
        <div class="md:max-w-[415px] my-auto">
          <h1 class="fr-h2 mb-3!">
            {@html sanitize(m['duel.hero.title']({ props: 'class="text-primary"' }))}
          </h1>
          <p class="mb-7! md:text-lg">
            {@html sanitize(m['duel.hero.desc']())}
          </p>

          <Link button href={KIT_URL} text={m['duel.hero.cta']()} size="lg" class="w-full!" />
        </div>

        <div class="my-auto">
          <img
            src="/duel/workshop.jpg"
            class="fr-responsive-img rounded-xl shadow-md"
            alt={m['duel.hero.alt']()}
          />
        </div>
      </div>
    </div>
  </section>

  <section class="fr-container--fluid bg-light-grey py-15">
    <div class="fr-container">
      <div class="gap-10 md:grid-cols-2 lg:px-20 grid">
        <h2 class="fr-h4 md:max-w-[460px] my-auto! leading-[1.875]!">
          {@html sanitize(m['duel.format.title']({ props: 'class="text-primary"' }))}
        </h2>

        <ul class="m-0! p-0! md:ms-auto! my-auto">
          {#each formatPoints as point (point)}
            <li class="p-0! not-last:mb-4 md:text-lg list-none">
              <Icon icon="i-ri-checkbox-circle-line" class="text-primary" />
              {m[`duel.format.${point}`]()}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <section class="fr-container--fluid bg-very-light-grey py-15">
    <div class="fr-container">
      <div class="lg:px-10">
        <div class="mb-6 text-center">
          <h2 class="fr-h3 mb-3!">{m['duel.publics.title']()}</h2>
          <p class="mb-0! text-grey">{m['duel.publics.desc']()}</p>
        </div>

        <div class="gap-6 md:grid-cols-2 lg:grid-cols-4 grid">
          {#each publicCards as card, i (i)}
            <div class="cg-border bg-white p-4 md:px-7 md:py-6">
              <Icon icon={card.icon} class={card.variant} size="lg" block />
              <h3 class="my-3! text-lg! md:mt-5!">{card.title}</h3>
              <p class="text-sm! text-grey">{card.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section class="fr-container--fluid bg-light-grey py-13">
    <div class="fr-container">
      <div class="lg:px-10">
        <div class="mb-11 text-center">
          <h2 class="fr-h3 mb-3! text-primary!">{m['duel.steps.title']()}</h2>
          <p class="mb-0! text-grey">{m['duel.steps.desc']()}</p>
        </div>

        <div class="gap-x-15 gap-y-10 md:grid-cols-2 md:gap-y-20 lg:grid-cols-3 grid">
          {#each workshopSteps as step, i (i)}
            <div class="gap-2 flex items-start">
              <div class="mt-1 gap-1 flex items-end">
                <div class="bg-primary h-[11px] w-[11px] rounded-full"></div>
                <span class="text-primary font-bold text-[40px]">{i + 1}</span>
              </div>
              <div>
                <h3 class="fr-h6 mb-1!">{step.title}</h3>
                <p class="mb-0!"><em>{step.duration}</em></p>
                <p class="mb-0! text-grey leading-[1.7]!">{step.desc}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section class="fr-container--fluid bg-very-light-grey py-18">
    <div class="fr-container">
      <div class="gap-10 md:grid-cols-2 lg:px-12 grid">
        <div class="md:max-w-[440px] my-auto">
          <h2 class="mb-6!">{m['duel.guide.title']()}</h2>

          <ul class="m-0! mb-13! p-0!">
            {#each guidePoints as point (point)}
              <li class="p-0! not-last:mb-3 md:text-lg list-none">
                <Icon icon="i-ri-checkbox-circle-line" class="text-primary" />
                {m[`duel.guide.${point}`]()}
              </li>
            {/each}
          </ul>

          <Link button href={KIT_URL} text={m['duel.hero.cta']()} size="lg" />
        </div>

        <div class="my-auto">
          <img
            src="/duel/extension.png"
            class="fr-responsive-img rounded-xl shadow-md"
            alt={m['duel.guide.alt']()}
          />
        </div>
      </div>
    </div>
  </section>

  <section class="fr-container--fluid py-15 bg-white">
    <div class="fr-container">
      <div class="lg:px-24">
        <h2 class="fr-h3 mb-8! lg:mb-10! text-center">{m['duel.faq.title']()}</h2>

        <AccordionGroup>
          {#each faq as q, i (i)}
            <Accordion id={`faq-${i}`} label={q.title}>
              {q.desc}
            </Accordion>
          {/each}
        </AccordionGroup>

        <div class="mt-8 lg:mt-11 text-center">
          <Link
            button
            size="lg"
            href="mailto:simonas.zilinskas@beta.gouv.fr"
            text={m['duel.faq.contact']()}
          />
        </div>
      </div>
    </div>
  </section>
</main>
