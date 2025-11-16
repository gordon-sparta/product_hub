'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/docs') return pathname === '/' || pathname.startsWith('/docs')
    return pathname.startsWith(path)
  }

  return (
    <aside className="w-64 border-r border-gray-200 bg-gradient-to-b from-white to-purple-50/30 p-6 shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
          Product Hub
        </h1>
        <p className="text-xs text-gray-500">Your workspace</p>
      </div>
      <nav className="space-y-2">
        <Link
          href="/"
          className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive('/docs')
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200 transform scale-105'
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-gray-900 hover:shadow-md'
          }`}
        >
          <span className="text-lg">{isActive('/docs') ? '📝' : '📄'}</span>
          <span>Docs</span>
          {isActive('/docs') && (
            <span className="ml-auto text-xs">✨</span>
          )}
        </Link>
        <Link
          href="/prototypes"
          className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive('/prototypes')
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200 transform scale-105'
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-gray-900 hover:shadow-md'
          }`}
        >
          <span className="text-lg">{isActive('/prototypes') ? '⚙️' : '🔧'}</span>
          <span>Prototypes</span>
          {isActive('/prototypes') && (
            <span className="ml-auto text-xs">✨</span>
          )}
        </Link>
      </nav>
    </aside>
  )
}

