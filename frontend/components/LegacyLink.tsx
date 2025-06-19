import NextLink, { LinkProps } from 'next/link'

export function LegacyLink(props: LinkProps) {
  // Force legacyBehavior everywhere, so your existing <a> children work
  return <NextLink {...props} legacyBehavior />
}
