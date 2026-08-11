<script lang="ts">
  import { Dropdown } from '$components'
  import { m } from '$lib/i18n/messages'
  import { getLocale } from '$lib/i18n/runtime'
  import { ALL_LOCALES, onLocaleChange } from '$lib/main'
  import type { SvelteHTMLElements } from 'svelte/elements'

  let { id, ...props }: { id: string } & SvelteHTMLElements['nav'] = $props()

  const currentLocale = getLocale()
  const localeData = $derived(ALL_LOCALES.find((loc) => loc.code === currentLocale)!)
</script>

<nav {...props} class={['language-selector fr-translate fr-nav whitespace-nowrap', props.class]}>
  <Dropdown
    id="dropdown-{id}"
    label={localeData.short}
    title={m['actions.selectLanguage']()}
    buttonClass="fr-translate__btn rounded-sm!"
    closeOnSelect
  >
    <ul class="fr-sidemenu__list">
      {#each ALL_LOCALES as locale (locale.code)}
        <li class="fr-sidemenu__item">
          <button
            class="fr-sidemenu__link py-2! font-normal! font-sm!"
            lang={locale.code}
            aria-current={locale.code == currentLocale}
            onclick={() => onLocaleChange(locale.code)}
          >
            {locale.long}
          </button>
        </li>
      {/each}
    </ul>
  </Dropdown>
</nav>

<style lang="postcss">
  .language-selector {
    :global(.fr-sidemenu__link) {
      outline-offset: -2px;

      &[aria-current]:not([aria-current='false']) {
        --text-active-blue-france: var(--blue-france-main-525);
        --border-active-blue-france: var(--blue-france-main-525);

        &::before {
          width: 4px;
          top: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
