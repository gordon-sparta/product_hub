import { notFound } from 'next/navigation'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { getPrototypeComponent } from '../registry'

async function getPrototype(slug: string) {
  const prototypePath = join(process.cwd(), 'prototypes', slug)
  try {
    const files = await readdir(prototypePath)
    const hasIndex = files.some((file) => 
      file === 'index.tsx' || file === 'index.ts' || file === 'index.jsx' || file === 'index.js'
    )
    return hasIndex
  } catch (error) {
    return false
  }
}

export default async function PrototypePage({
  params,
}: {
  params: { slug: string }
}) {
  const exists = await getPrototype(params.slug)

  if (!exists) {
    notFound()
  }

  const PrototypeComponent = getPrototypeComponent(params.slug)

  if (!PrototypeComponent) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Prototype &quot;{params.slug}&quot; not found in registry.
            Add it to app/prototypes/registry.ts
          </p>
          <a
            href="/prototypes"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            ← Back to Prototypes
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full">
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/prototypes"
          className="text-sm text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
        >
          ← Back to Prototypes
        </a>
      </div>
      <PrototypeComponent />
    </div>
  )
}

