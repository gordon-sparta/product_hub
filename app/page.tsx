import Link from 'next/link'
import { readdir } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

async function getDocs() {
  const docsDirectory = join(process.cwd(), 'content', 'docs')
  try {
    const files = await readdir(docsDirectory)
    const docs = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = join(docsDirectory, file)
          const fileContents = await import('fs').then((fs) =>
            fs.promises.readFile(filePath, 'utf8')
          )
          const { data, content } = matter(fileContents)
          return {
            slug: file.replace('.md', ''),
            title: data.title || content.split('\n')[0].replace('#', '').trim(),
            date: data.date || null,
            tags: data.tags || [],
          }
        })
    )
    return docs
  } catch (error) {
    return []
  }
}

export default async function Home() {
  const docs = await getDocs()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Docs</h1>
        <p className="text-gray-600">Your collection of markdown documentation</p>
      </div>

      {/* Instructions */}
      <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How this works</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-medium mb-1">📝 <strong>Docs Section:</strong></p>
            <p>Add markdown files (`.md`) to the <code className="bg-white px-1.5 py-0.5 rounded text-xs">content/docs</code> folder. They'll automatically appear here. You can use frontmatter for metadata:</p>
            <pre className="mt-2 p-3 bg-white rounded text-xs overflow-x-auto">
{`---
title: My Document
date: 2024-01-01
tags: [tag1, tag2]
---`}
            </pre>
          </div>
          <p className="text-xs text-gray-600 mt-3">💡 Use the sidebar to switch between Docs and Prototypes sections.</p>
        </div>
      </div>

      {docs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No docs yet. Add markdown files to <code className="bg-gray-100 px-2 py-1 rounded">content/docs</code></p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {doc.title}
              </h2>
              {doc.date && (
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(doc.date).toLocaleDateString()}
                </p>
              )}
              {doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {doc.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

