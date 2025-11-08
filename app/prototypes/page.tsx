import { readdir } from 'fs/promises'
import { join } from 'path'
import Link from 'next/link'

async function getPrototypes() {
  const prototypesDirectory = join(process.cwd(), 'prototypes')
  try {
    const dirs = await readdir(prototypesDirectory, { withFileTypes: true })
    const prototypes = dirs
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
    return prototypes
  } catch (error) {
    return []
  }
}

export default async function PrototypesPage() {
  const prototypes = await getPrototypes()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⚙️ Prototypes</h1>
        <p className="text-gray-600">Interactive code experiments and demos</p>
      </div>

      {/* Instructions */}
      <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How to add prototypes</h2>
        <div className="text-sm text-gray-700">
          <p className="mb-2">Create React components in the <code className="bg-white px-1.5 py-0.5 rounded text-xs">prototypes/</code> folder. Each prototype needs:</p>
          <ul className="list-disc list-inside mt-1 ml-2 space-y-1">
            <li>A folder (e.g., <code className="bg-white px-1 py-0.5 rounded text-xs">prototypes/my-prototype/</code>)</li>
            <li>An <code className="bg-white px-1 py-0.5 rounded text-xs">index.tsx</code> file with a default export</li>
            <li>Registration in <code className="bg-white px-1 py-0.5 rounded text-xs">app/prototypes/registry.ts</code></li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded text-xs">
            <p className="font-medium mb-1">Example:</p>
            <pre className="text-xs overflow-x-auto">
{`// prototypes/my-prototype/index.tsx
'use client'

export default function MyPrototype() {
  return <div>Hello World</div>
}

// Then add to app/prototypes/registry.ts:
'my-prototype': () => import('../../prototypes/my-prototype/index'),`}
            </pre>
          </div>
        </div>
      </div>

      {prototypes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No prototypes yet. Add prototype folders to <code className="bg-gray-100 px-2 py-1 rounded">prototypes/</code></p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prototypes.map((prototype) => (
            <Link
              key={prototype}
              href={`/prototypes/${prototype}`}
              className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {prototype.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Click to open prototype
              </p>
              <span className="text-sm text-blue-600 hover:text-blue-700">
                Open →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

