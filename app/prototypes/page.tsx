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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-indigo-400/20"></div>
        <div className="relative px-8 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                ⚙️
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Prototypes
                </h1>
                <p className="text-lg text-gray-600 font-medium">Interactive code experiments and demos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-12 max-w-7xl mx-auto">
        {/* Instructions Card */}
        <div className="mb-10 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🚀
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">How to add prototypes</h2>
                <div className="space-y-4 text-gray-700">
                  <p className="text-sm mb-3">Create React components in the <code className="bg-white px-2 py-1 rounded-md text-xs font-mono text-blue-600 border border-blue-200">prototypes/</code> folder. Each prototype needs:</p>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>A folder (e.g., <code className="bg-white px-2 py-0.5 rounded text-xs font-mono border border-blue-200">prototypes/my-prototype/</code>)</li>
                      <li>An <code className="bg-white px-2 py-0.5 rounded text-xs font-mono border border-blue-200">index.tsx</code> file with a default export</li>
                      <li>Registration in <code className="bg-white px-2 py-0.5 rounded text-xs font-mono border border-blue-200">app/prototypes/registry.ts</code></li>
                    </ul>
                    <div className="mt-4 bg-white rounded-lg p-3 border border-blue-200">
                      <p className="font-medium mb-2 text-xs text-gray-900">Example:</p>
                      <pre className="text-xs text-gray-700 overflow-x-auto">
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
              </div>
            </div>
          </div>
        </div>

        {/* Prototypes Grid */}
        {prototypes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">
              🔧
            </div>
            <p className="text-xl text-gray-600 mb-2 font-medium">No prototypes yet</p>
            <p className="text-gray-500">Add prototype folders to <code className="bg-white px-3 py-1 rounded-md text-sm font-mono border border-gray-200 shadow-sm">prototypes/</code></p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prototypes.map((prototype, index) => {
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-indigo-500 to-purple-500',
                'from-cyan-500 to-teal-500',
                'from-blue-500 to-indigo-500',
                'from-teal-500 to-cyan-500',
                'from-purple-500 to-indigo-500',
              ]
              const colorClass = colors[index % colors.length]
              const displayName = prototype.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
              
              return (
                <Link
                  key={prototype}
                  href={`/prototypes/${prototype}`}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-300 rounded-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400"></div>
                  <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Decorative gradient bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass} rounded-t-2xl`}></div>
                    
                    <div className="mt-2">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                          ⚙️
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all">
                          {displayName}
                        </h2>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4">
                        Interactive prototype demo
                      </p>
                      
                      {/* Arrow indicator */}
                      <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Open prototype</span>
                        <span className="ml-2 text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

