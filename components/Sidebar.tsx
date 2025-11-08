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
    <aside className="w-64 border-r border-gray-200 bg-gray-50 p-6">
      <h1 className="mb-8 text-xl font-semibold text-gray-900">
        Product Hub
      </h1>
      <nav className="space-y-2">
        <Link
          href="/"
          className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            isActive('/docs')
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          📝 Docs
        </Link>
        <Link
          href="/prototypes"
          className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            isActive('/prototypes')
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          ⚙️ Prototypes
        </Link>
      </nav>
    </aside>
  )
}

