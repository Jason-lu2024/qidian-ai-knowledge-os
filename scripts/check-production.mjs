const rawSiteUrl = process.env.SITE_URL?.trim()

if (!rawSiteUrl) {
  console.error('Production build blocked: set SITE_URL to the confirmed public HTTPS origin.')
  process.exit(1)
}

let siteUrl
try {
  siteUrl = new URL(rawSiteUrl)
} catch {
  console.error('Production build blocked: SITE_URL is not a valid absolute URL.')
  process.exit(1)
}

const blockedHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0', 'example.com'])
if (siteUrl.protocol !== 'https:' || blockedHosts.has(siteUrl.hostname) || siteUrl.pathname !== '/') {
  console.error('Production build blocked: SITE_URL must be the confirmed HTTPS origin without a path.')
  process.exit(1)
}

process.stdout.write(`Production origin verified: ${siteUrl.origin}\n`)
