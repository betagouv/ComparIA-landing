<script lang="ts">
  import { browser } from '$app/environment'
  import 'uno.css'
  import '../css/app.css'

  let { children } = $props()

  if (browser) {
    // FIXME import only needed parts?
    // @ts-expect-error - DSFR module import
    import('@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js')
  }
</script>

{@render children()}
