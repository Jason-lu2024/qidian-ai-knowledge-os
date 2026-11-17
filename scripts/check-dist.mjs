import { readFile, readdir } from 'node:fs/promises'
import { resolve, relative } from 'node:path'

const root = resolve('docs/.vitepress/dist')
const htmlFiles = []

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) await walk(path)
    else if (entry.name.endsWith('.html')) htmlFiles.push(path)
  }
}

await walk(root)
const failures = []
const titles = new Map()
const unfinishedMarkers = [['TO', 'DO'].join(''), ['FIX', 'ME'].join('')]

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  const name = relative(root, file)
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length
  if (name !== '404.html' && h1Count !== 1) failures.push(`${name}: expected 1 H1, found ${h1Count}`)
  if (!/<meta name="description" content="[^"]+">/.test(html)) failures.push(`${name}: missing meta description`)
  if (!/<link rel="canonical" href="https?:\/\/[^"\s]+">/.test(html)) failures.push(`${name}: missing canonical URL`)
  if (!/<script type="application\/ld\+json">/.test(html)) failures.push(`${name}: missing JSON-LD`)
  if (unfinishedMarkers.some(marker => html.includes(marker))) failures.push(`${name}: unfinished marker in output`)

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  if (!title) failures.push(`${name}: missing title`)
  else if (titles.has(title)) failures.push(`${name}: duplicate title with ${titles.get(title)}`)
  else titles.set(title, name)
}

if (failures.length) {
  console.error(`Static output validation failed:\n${failures.join('\n')}`)
  process.exit(1)
}

process.stdout.write(`Validated ${htmlFiles.length} HTML files: H1, metadata, JSON-LD and titles are production-complete.\n`)
