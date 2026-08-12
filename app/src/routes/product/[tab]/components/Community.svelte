<script lang="ts">
  import { Icon } from '$components/dsfr'
  import { m } from '$lib/i18n/messages'

  const frTeam = (
    [
      { name: 'Lucie Termignon', key: 'lucie', imgSrc: 'lucie-termignon.webp' },
      { name: 'Simonas Zilinskas', key: 'simonas', imgSrc: 'simonas-zilinskas.webp' },
      { name: 'Aurélien Barot', key: 'aurelien', imgSrc: 'aurelien-barot.webp' },
      { name: 'Nicolas Chesnais', key: 'nicolas', imgSrc: 'nicolas-chesnais.webp' },
      { name: 'Hadrien Pelissier', key: 'hadrien', imgSrc: 'hadrien-pelissier.webp' },
      { name: 'Elie Gavoty', key: 'elie', imgSrc: 'elie-gavoty.webp' },
      { name: 'Mathilde Bras', key: 'mathilde', imgSrc: 'mathilde-bras.webp' }
    ] as const
  ).map((card) => ({
    ...card,
    job: m[`product.community.teams.fr.people.${card.key}.job`](),
    date: m[`product.community.teams.fr.people.${card.key}.date`]()
  }))
</script>

<section>
  <h2 class="fr-h4">
    {m['product.community.title']()}
  </h2>
  <div class="gap-4 lg:grid-cols-2 grid">
    <section class="cg-border cl-card">
      <h3 class="fr-h5 mb-7!">
        <Icon icon="i-ri-flag-2-line" class="text-[#000091]" />
        {m['product.community.countries.fr']()}
      </h3>

      <div class="my-6 gap-8 flex flex-col">
        <div class="cl-logos gap-2">
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/etalab.svg"
            alt="Etalab"
            title="Etalab"
            width="235px"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/peren.svg"
            alt="PEReN, Pôle d'expertise de la régulation numérique"
            title="Pôle d'expertise de la régulation numérique (PEReN)"
            width="235px"
          />
        </div>
        <div class="cl-logos gap-8">
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/cnnum.webp"
            alt="Conseil national du numérique"
            title="Conseil national du numérique"
            width="112px"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/caire.webp"
            alt="Citizen-oriented Artificial Intelligence training for a Responsible Education"
            title="Citizen-oriented Artificial Intelligence training for a Responsible Education"
            width="105px"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/inria.webp"
            alt="Inria"
            title="Inria"
            width="139px"
          />
        </div>
        <div class="cl-logos gap-5">
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/cafe-ia.webp"
            alt="Cafés de l'IA"
            title="Cafés IA"
            width="104px"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/latitudes.webp"
            alt="Latitudes"
            title="Latitudes"
            width="110px"
            class="dark:invert"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/pix.svg"
            alt="Pix"
            title="Pix"
            width="60px"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/fresque-de-lia.webp"
            alt="Fresques de l'IA"
            title="Fresques de l'IA"
            width="94px"
            class="dark:invert"
          />
        </div>
      </div>
    </section>

    <section class="cg-border cl-card">
      <h3 class="fr-h5">
        <Icon icon="i-ri-flag-2-line" class="text-[--red-marianne-main-472]" />
        {m['product.community.countries.da']()}
      </h3>

      <div class="my-6 gap-8 flex flex-col">
        <div class="cl-logos">
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/da-light.webp"
            alt="Logos des partenaires danois"
            class="max-h-[75px] dark:hidden"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/orgs/da-dark.webp"
            alt="Logos des partenaires danois"
            class="hidden max-h-[75px] dark:block"
          />
        </div>
      </div>
    </section>
  </div>
</section>

<section class="mt-22 mb-6">
  <h2 class="fr-h4">
    {m['product.community.teams.fr.title']()}
  </h2>

  <div class="gap-x-9 gap-y-6 md:grid-cols-2 lg:grid-cols-3 grid">
    {#each frTeam as person (person.key)}
      <div class="cg-border cl-card p-4! gap-5 flex">
        <div
          class="after:bg-primary after:inset-0 relative h-[100px] min-w-[100px] after:absolute after:rounded-full after:opacity-10 after:content-['']"
        >
          <img
            loading="lazy"
            decoding="async"
            src={'/product/community/' + person.imgSrc}
            aria-hidden="true"
            alt=""
            class="h-[100px] w-[100px] rounded-full saturate-80"
          />
        </div>
        <div class="flex flex-col">
          <p class="mb-2! font-bold">{person.name}</p>
          <p class="mb-0! leading-normal! text-grey text-[12px]!">{person.job}</p>
          <p class="mb-0! leading-normal! mt-auto! text-[10px]!">{person.date}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<style lang="postcss">
  @reference '$css/app.css';

  .cl-card {
    @apply bg-very-light-info p-4 md:p-8;
  }
  .cl-logos {
    @apply flex flex-wrap *:object-contain;
  }
</style>
