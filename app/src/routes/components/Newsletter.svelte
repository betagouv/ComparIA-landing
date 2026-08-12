<script lang="ts">
  import { Icon } from '$components/dsfr'
  import { m } from '$lib/i18n/messages'
</script>

<div class="cg-border bg-white px-5 py-10 md:px-8">
  <h2 class="fr-h5 mb-2! flex items-center">
    <Icon icon="i-ri-mail-line" size="lg" block class="text-primary me-2" />
    {m['home.newsletter.title']()}
  </h2>
  <p class="text-sm!">{m['home.newsletter.desc']()}</p>
  <iframe
    data-tally-src="https://tally.so/embed/zxKR40?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
    loading="lazy"
    width="100%"
    height="380"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    title={m['home.newsletter.iframeTitle']()}
    class="dark:invert"
  ></iframe>
</div>

<style>
  iframe {
    color-scheme: light;
  }
</style>
