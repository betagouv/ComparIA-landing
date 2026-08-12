<script lang="ts">
  import { Accordion, AccordionGroup, Tabs } from '$components/dsfr'
  import { m } from '$lib/i18n/messages'
  import { ARENA_URL } from '$lib/main'
  import { propsToAttrs, sanitize } from '$lib/utils'

  // The few answers that carry a link need props the generic mapping can't pass
  const descOverrides: Record<string, string> = {
    'models-1': m['faq.models.questions.1.desc']({
      linkProps: propsToAttrs({ href: `${ARENA_URL}/ranking` })
    }),
    'datasets-1': m['faq.datasets.questions.1.desc']({
      linkProps: propsToAttrs({ href: `${ARENA_URL}/privacy` })
    })
  }

  // Answers without placeholders, called through a cast so the ones that do take
  // params (handled above) don't force an argument here
  const plain = (message: unknown) => (message as () => string)()

  const tabs = [
    {
      id: 'usage',
      label: m['faq.usage.title'](),
      qs: (['1', '2', '3', '4', '5', '6', '7'] as const).map((q) => ({
        title: m[`faq.usage.questions.${q}.title`](),
        desc: m[`faq.usage.questions.${q}.desc`]()
      }))
    },
    {
      id: 'models',
      label: m['faq.models.title'](),
      qs: (['1', '2', '3', '4', '5', '6'] as const).map((q) => ({
        title: m[`faq.models.questions.${q}.title`](),
        desc: descOverrides[`models-${q}`] ?? plain(m[`faq.models.questions.${q}.desc`])
      }))
    },
    {
      id: 'datasets',
      label: m['faq.datasets.title'](),
      qs: (['1', '2', '3', '4'] as const).map((q) => ({
        title: m[`faq.datasets.questions.${q}.title`](),
        desc: descOverrides[`datasets-${q}`] ?? plain(m[`faq.datasets.questions.${q}.desc`])
      }))
    },
    {
      id: 'ecology',
      label: m['faq.ecology.title'](),
      qs: (['1', '2', '3', '4', '5'] as const).map((q) => ({
        title: m[`faq.ecology.questions.${q}.title`](),
        desc: m[`faq.ecology.questions.${q}.desc`]()
      }))
    },
    {
      id: 'i18n',
      label: m['faq.i18n.title'](),
      qs: (['1', '2'] as const).map((q) => ({
        title: m[`faq.i18n.questions.${q}.title`](),
        desc: m[`faq.i18n.questions.${q}.desc`]()
      }))
    }
  ]
</script>

<Tabs {tabs} noBorders kind="nav" label={m['faq.title']()}>
  {#snippet tab({ id })}
    {#each tabs as tab (tab.id)}
      {#if id === tab.id}
        <AccordionGroup>
          {#each tab.qs as q, i (`${tab.id}-${i}`)}
            <Accordion id={`${tab.id}-${i}`} label={q.title}>
              {@html sanitize(q.desc)}
            </Accordion>
          {/each}
        </AccordionGroup>
      {/if}
    {/each}
  {/snippet}
</Tabs>
