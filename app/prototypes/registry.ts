// Prototype registry - add your prototypes here
// This file maps prototype slugs to their components

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

export const prototypes: Record<string, () => Promise<{ default: ComponentType }>> = {
  'bouncing-ball': () => import('../../prototypes/bouncing-ball/index'),
  'counter': () => import('../../prototypes/counter/index'),
}

export function getPrototypeComponent(slug: string) {
  const loader = prototypes[slug]
  if (!loader) {
    return null
  }
  return dynamic(loader, { ssr: false })
}

