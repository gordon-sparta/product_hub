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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20"></div>
        <div className="relative px-8 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                📝
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Docs
                </h1>
                <p className="text-lg text-gray-600 font-medium">Your beautiful collection of markdown documentation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-12 max-w-7xl mx-auto">
        {/* Instructions Card */}
        <div className="mb-10 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ✨
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">How this works</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                    <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-xl">📝</span>
                      <span>Docs Section</span>
                    </p>
                    <p className="text-sm mb-3">Add markdown files (`.md`) to the <code className="bg-white px-2 py-1 rounded-md text-xs font-mono text-purple-600 border border-purple-200">content/docs</code> folder. They'll automatically appear here with beautiful styling!</p>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <pre className="text-xs text-gray-700 overflow-x-auto">
{`---
title: My Document
date: 2024-01-01
tags: [tag1, tag2]
---`}
                      </pre>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <span className="text-lg">💡</span>
                    <p>Use the sidebar to switch between Docs and Prototypes sections.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Docs Grid */}
        {docs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">
              📄
            </div>
            <p className="text-xl text-gray-600 mb-2 font-medium">No docs yet</p>
            <p className="text-gray-500">Add markdown files to <code className="bg-white px-3 py-1 rounded-md text-sm font-mono border border-gray-200 shadow-sm">content/docs</code></p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc, index) => {
              const colors = [
                'from-purple-500 to-pink-500',
                'from-blue-500 to-cyan-500',
                'from-pink-500 to-rose-500',
                'from-indigo-500 to-purple-500',
                'from-cyan-500 to-blue-500',
                'from-rose-500 to-pink-500',
              ]
              const colorClass = colors[index % colors.length]
              
              return (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-300 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"></div>
                  <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Decorative gradient bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass} rounded-t-2xl`}></div>
                    
                    <div className="mt-2">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all">
                        {doc.title}
                      </h2>
                      
                      {doc.date && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm">📅</span>
                          <p className="text-sm text-gray-500 font-medium">
                            {new Date(doc.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      )}
                      
                      {doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {doc.tags.map((tag: string, tagIndex: number) => {
                            const tagColors = [
                              'bg-purple-100 text-purple-700 border-purple-200',
                              'bg-pink-100 text-pink-700 border-pink-200',
                              'bg-blue-100 text-blue-700 border-blue-200',
                              'bg-cyan-100 text-cyan-700 border-cyan-200',
                              'bg-indigo-100 text-indigo-700 border-indigo-200',
                            ]
                            const tagColor = tagColors[tagIndex % tagColors.length]
                            
                            return (
                              <span
                                key={tag}
                                className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColor} shadow-sm`}
                              >
                                {tag}
                              </span>
                            )
                          })}
                        </div>
                      )}
                      
                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Read more</span>
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

