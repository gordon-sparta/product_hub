# Product Hub

A minimal Next.js app for managing markdown documentation and interactive prototypes.

## Features

- 📝 **Docs**: Browse and read markdown documentation with frontmatter support
- ⚙️ **Prototypes**: Host and run small interactive React components
- 🎨 **Clean UI**: Minimal, focused design with TailwindCSS
- ⚡ **Fast**: Built with Next.js 14 App Router

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Content

### Adding Docs

1. Create a markdown file in `content/docs/`
2. Add frontmatter (optional):

```yaml
---
title: My Document
date: 2024-01-01
tags: [tag1, tag2]
---
```

3. Write your content in markdown
4. The doc will automatically appear in the docs list

### Adding Prototypes

1. Create a folder in `prototypes/` (e.g., `prototypes/my-prototype/`)
2. Add an `index.tsx` file with a default export React component:

```tsx
'use client'

export default function MyPrototype() {
  return <div>Hello World</div>
}
```

3. Register the prototype in `app/prototypes/registry.ts`:

```ts
export const prototypes: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  // ... existing prototypes
  'my-prototype': () => import('../../prototypes/my-prototype/index'),
}
```

4. The prototype will automatically appear in the prototypes list

## Project Structure

```
product_hub/
├── app/                    # Next.js app directory
│   ├── docs/[slug]/       # Individual doc pages
│   ├── prototypes/         # Prototype pages
│   └── layout.tsx         # Root layout
├── components/            # React components
├── content/
│   └── docs/              # Markdown documentation
├── prototypes/            # Prototype components
└── public/                # Static assets
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **react-markdown** - Markdown rendering
- **gray-matter** - Frontmatter parsing

## License

MIT

