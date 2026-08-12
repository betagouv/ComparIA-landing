import sanitizeHtml from 'sanitize-html'

export function sanitize(html: string, allowLinks = true): string {
  const options: sanitizeHtml.IOptions = {
    allowedAttributes: {
      span: ['class'],
      a: ['href', 'rel', 'target', 'title', 'class', 'data-fr-opened', 'aria-controls'],
      br: []
    }
  }
  if (!allowLinks) {
    options.allowedTags = sanitizeHtml.defaults.allowedTags.filter((tag) => tag !== 'a')
  }
  return sanitizeHtml(html, options)
}

export function propsToAttrs(props: Record<string, unknown>): string {
  return Object.entries(props)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')
}

export function externalLinkProps(props: Record<string, unknown> | string): string {
  const _props = { target: '_blank', rel: 'noopener external' }
  return propsToAttrs(
    typeof props === 'string' ? { ..._props, href: props } : { ..._props, ...props }
  )
}
