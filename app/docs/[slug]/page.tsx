import { readFile } from 'fs/promises'
import { join } from 'path'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import Link from 'next/link'

async function getDoc(slug: string) {
  const filePath = join(process.cwd(), 'content', 'docs', `${slug}.md`)
  try {
    const fileContents = await readFile(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      title: data.title || content.split('\n')[0].replace('#', '').trim(),
      content,
      date: data.date || null,
      tags: data.tags || [],
    }
  } catch (error) {
    return null
  }
}

export default async function DocPage({
  params,
}: {
  params: { slug: string }
}) {
  const doc = await getDoc(params.slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
      >
        ← Back to Docs
      </Link>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{doc.title}</h1>
        {doc.date && (
          <p className="text-sm text-gray-500 mb-6">
            {new Date(doc.date).toLocaleDateString()}
          </p>
        )}
        {doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
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
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {doc.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}

