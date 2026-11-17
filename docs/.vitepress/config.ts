import { defineConfig } from 'vitepress'
import { siteConfig } from './data/site'

const rawSiteUrl = process.env.SITE_URL?.trim() || 'http://127.0.0.1:5173'
const siteUrl = new URL(rawSiteUrl)
if (!['http:', 'https:'].includes(siteUrl.protocol)) throw new Error('SITE_URL 必须使用 http 或 https 协议。')
const siteOrigin = siteUrl.origin

const descriptions: Record<string, string> = {
  'index.md': '启点 AI 通过7库+AI联动，帮助一人公司和中小企业把散落经验变成可持续生产、复用与增长的知识资产。',
  'knowledge-os/index.md': '完整理解定位库、客户库、问题库、素材库、方法库、产品库与高分样本库如何形成一个会运转的知识资产系统。',
  'knowledge-os/positioning.md': '定位库用于统一你是谁、服务谁与为什么选择你的表达，并为内容、产品、销售方案提供稳定依据。',
  'experience/index.md': '用30分钟完成一次知识归类、AI调用、人工审核与结果回存，理解7库+AI联动如何进入真实业务。',
  'learning/index.md': '从认识 WorkBuddy 与 IMA 开始，逐步完成7库搭建、第一次AI联动和可复用工作流，适合零基础学习。',
  'cases/index.md': '通过明确标注的演示案例，了解一人公司、咨询培训与中小企业如何使用7库+AI联动解决真实业务问题。',
  'services/index.md': '对比14天训练营、3个月1对1陪跑与企业7库搭建的适合对象、核心结果、交付内容、边界与价格。'
}

const crumbs: Record<string, Array<{ name: string; path: string }>> = {
  'index.md': [{ name: '首页', path: '/' }],
  'knowledge-os/index.md': [{ name: '首页', path: '/' }, { name: '7库体系', path: '/knowledge-os/' }],
  'knowledge-os/positioning.md': [{ name: '首页', path: '/' }, { name: '7库体系', path: '/knowledge-os/' }, { name: '定位库', path: '/knowledge-os/positioning' }],
  'experience/index.md': [{ name: '首页', path: '/' }, { name: '免费体验', path: '/experience/' }],
  'learning/index.md': [{ name: '首页', path: '/' }, { name: '学习路径', path: '/learning/' }],
  'cases/index.md': [{ name: '首页', path: '/' }, { name: '案例', path: '/cases/' }],
  'services/index.md': [{ name: '首页', path: '/' }, { name: '课程与服务', path: '/services/' }]
}

export default defineConfig({
  lang: 'zh-CN',
  title: siteConfig.brandName,
  description: siteConfig.descriptor,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#071226' }],
    ['meta', { name: 'color-scheme', content: 'light' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  transformHead({ pageData }) {
    const filePath = pageData.filePath
    const description = pageData.frontmatter.description || descriptions[filePath] || siteConfig.descriptor
    const canonicalPath = filePath === 'index.md'
      ? '/'
      : filePath.endsWith('/index.md')
        ? `/${filePath.replace(/index\.md$/, '')}`
        : `/${filePath.replace(/\.md$/, '')}`
    const canonical = `${siteOrigin}${canonicalPath}`
    const frontmatterCrumbs = pageData.frontmatter.breadcrumbs as Array<{ text: string; link?: string }> | undefined
    const breadcrumb = frontmatterCrumbs?.map(item => ({ name: item.text, path: item.link || canonicalPath })) || crumbs[filePath] || [{ name: '首页', path: '/' }]
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization', '@id': `${siteOrigin}/#organization`,
        name: '启点 AI', url: siteOrigin,
        description: siteConfig.descriptor
      },
      {
        '@type': 'WebSite', '@id': `${siteOrigin}/#website`,
        name: siteConfig.brandName, alternateName: siteConfig.englishName,
        url: siteOrigin, publisher: { '@id': `${siteOrigin}/#organization` }
      }
    ]
    if (breadcrumb.length) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((item, index) => ({
          '@type': 'ListItem', position: index + 1, name: item.name, item: `${siteOrigin}${item.path}`
        }))
      })
    }
    if (pageData.frontmatter.article) {
      graph.push({
        '@type': 'Article', headline: pageData.title, description,
        datePublished: pageData.frontmatter.date_published || siteConfig.updatedAt,
        dateModified: pageData.frontmatter.date_modified || siteConfig.updatedAt,
        author: { '@type': 'Organization', name: pageData.frontmatter.author || siteConfig.author },
        reviewer: { '@type': 'Organization', name: pageData.frontmatter.reviewer || siteConfig.reviewer },
        mainEntityOfPage: canonical
      })
    }
    return [
      ['meta', { name: 'description', content: description }],
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:title', content: pageData.title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: pageData.frontmatter.article ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:site_name', content: siteConfig.brandName }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })]
    ]
  },
  sitemap: {
    hostname: siteOrigin,
    transformItems: items => items.filter(item => !/(^|\/)404\/?$/.test(item.url))
  },
  themeConfig: { search: { provider: 'local' } }
})
