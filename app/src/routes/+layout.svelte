<script lang="ts">
  import { browser } from '$app/environment'
  import { Footer, Header } from '$components'
  import { Icon } from '$components/dsfr'
  import { m } from '$lib/i18n/messages'
  import { getLocale } from '$lib/i18n/runtime'
  import { onMount } from 'svelte'
  import 'uno.css'
  import '../css/app.css'

  let { children } = $props()

  const isFr = $derived(getLocale() === 'fr')

  if (browser) {
    // FIXME import only needed parts?
    // @ts-expect-error - DSFR module import
    import('@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js')
  }

  onMount(() => {
    if (isFr) {
      const script = document.createElement('script')
      script.src = 'https://tally.so/widgets/embed.js'
      script.async = true
      document.head.appendChild(script)
      return () => script.remove()
    }
  })
</script>

<div class="fr-skiplinks">
  <nav class="fr-container" aria-label={m['a11y.skiplinks.label']()}>
    <ul class="fr-skiplinks__list">
      <li><a class="fr-link" href="#content">{m['a11y.skiplinks.content']()}</a></li>
      <li><a class="fr-link" href="#main-footer">{m['a11y.skiplinks.footer']()}</a></li>
    </ul>
  </nav>
</div>

<Header />

{@render children()}

<div id="tooltips"></div>

{#if isFr}
  <button
    data-tally-open="1AVpXL"
    data-tally-hide-title="1"
    data-tally-auto-close="5000"
    class="bottom-6 right-6 gap-2 px-4 py-3 text-white! shadow-lg fixed z-50 flex cursor-pointer items-center rounded-full bg-[#6A6AF4]! hover:bg-[#9898f8]!"
    aria-label="Donner votre avis"
  >
    <Icon icon="i-ri-feedback-line" class="text-white" />
    <span class="text-sm font-medium">Votre avis</span>
  </button>
{/if}

<Footer />
