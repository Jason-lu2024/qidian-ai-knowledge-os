import { readFile, readdir } from 'node:fs/promises'
import { resolve, relative } from 'node:path'

const root = resolve('.')
const targets = ['docs', 'scripts']
const files = []
const blockedMarkers = [['TO', 'DO'].join(''), ['FIX', 'ME'].join('')]

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true })
  for (const entry of entries) {
    if (['node_modules', 'dist', 'cache', 'public'].includes(entry.name)) continue
    const full = resolve(path, entry.name)
    if (entry.isDirectory()) await walk(full)
    else files.push(full)
  }
}

for (const target of targets) await walk(resolve(target))

let count = 0
for (const file of [...new Set(files)]) {
  const content = await readFile(file, 'utf8').catch(() => '')
  content.split('\n').forEach((line, index) => {
    if (blockedMarkers.some(marker => line.includes(marker))) {
      process.stdout.write(`${relative(root, file)}:${index + 1}: ${line.trim()}\n`)
      count++
    }
  })
}
if (count) {
  console.error(`Found ${count} unfinished production markers.`)
  process.exit(1)
}
process.stdout.write('No unfinished production markers found.\n')
