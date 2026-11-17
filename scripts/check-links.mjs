import { readFile, readdir } from 'node:fs/promises'
import { resolve, relative } from 'node:path'

const root = resolve('docs')
const files = []
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['cache', 'dist', 'public'].includes(entry.name)) continue
    const path = resolve(dir, entry.name)
    if (entry.isDirectory()) await walk(path)
    else if (/\.(md|vue|ts)$/.test(entry.name)) files.push(path)
  }
}
await walk(root)
const markdownFiles = files.filter(file => file.endsWith('.md'))
const normalizeRoute = value => {
  const route = value.split(/[?#]/)[0]
  if (route === '/') return route
  return route.replace(/\/$/, '')
}
const routes = new Set(markdownFiles.map(file => {
  const rel = relative(root, file).replace(/\\/g, '/')
  const route = rel === 'index.md' ? '/' : `/${rel.replace(/index\.md$/, '').replace(/\.md$/, '')}`
  return normalizeRoute(route)
}))
const broken = []
for (const file of files) {
  const content = await readFile(file, 'utf8')
  const patterns = [
    /(?:href|[a-z-]+href)\s*=\s*["']([^"']+)["']/gi,
    /(?:href|[A-Za-z]+Href)\s*:\s*["']([^"']+)["']/g,
    /\]\((\/[^)\s]+)\)/g
  ]
  for (const pattern of patterns) for (const match of content.matchAll(pattern)) {
    const href = match[1]
    if (!href.startsWith('/') || href.startsWith('//') || href.includes('${')) continue
    const normalized = normalizeRoute(href)
    if (/\.[a-z0-9]+$/i.test(normalized) || routes.has(normalized)) continue
    broken.push(`${relative(root, file)} -> ${href}`)
  }
}

for (const file of markdownFiles.filter(file => relative(root, file).startsWith('learning/') && !file.endsWith('learning/index.md'))) {
  const content = await readFile(file, 'utf8')
  const course = content.match(/^learningCourse:\s*([^\s]+)$/m)?.[1]
  const lesson = content.match(/^learningLesson:\s*([^\s]+)$/m)?.[1]
  const actual = normalizeRoute(`/${relative(root, file).replace(/\\/g, '/').replace(/\.md$/, '')}`)
  const expected = course && lesson ? `/learning/${course}/${lesson}` : ''
  if (!course || !lesson || actual !== expected) broken.push(`${relative(root, file)} -> 学习课时元数据与路径不一致`)
}

if (broken.length) { console.error(`Broken local routes:\n${broken.join('\n')}`); process.exit(1) }
process.stdout.write(`Checked ${files.length} source files and ${markdownFiles.length} routes; all local links resolve.\n`)
