<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Content, useData, useRoute } from 'vitepress'
import { siteConfig } from '../data/site'
import LearningReader from './components/LearningReader.vue'

const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const currentHash = ref('')
const route = useRoute()
const { frontmatter } = useData()
watch(() => route.path, async () => {
  menuOpen.value = false
  await nextTick()
  document.getElementById('main-content')?.focus({ preventScroll: true })
})
const syncHash = () => { currentHash.value = window.location.hash }
const closeMenuOnEscape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus({ preventScroll: true })
}
onMounted(() => {
  syncHash()
  window.addEventListener('hashchange', syncHash)
  window.addEventListener('keydown', closeMenuOnEscape)
})
onUnmounted(() => {
  window.removeEventListener('hashchange', syncHash)
  window.removeEventListener('keydown', closeMenuOnEscape)
})

const nav = [
  { label: '7库体系', href: '/knowledge-os/' },
  { label: 'AI联动', href: '/#ai-loop' },
  { label: '案例', href: '/cases/' },
  { label: '学习路径', href: '/learning/' },
  { label: '课程与服务', href: '/services/' },
  { label: '关于我们', href: '/#about' }
]
const active = (href: string) => {
  const [path, hash] = href.split('#')
  if (hash && path === '/') return route.path === '/' && currentHash.value === `#${hash}`
  return path !== '/' && route.path.startsWith(path)
}
const crumbs = computed(() => frontmatter.value.breadcrumbs || [])
const showBreadcrumb = computed(() => crumbs.value.length >= 3)
const learningToc = computed(() => frontmatter.value.learningToc || [])
</script>

<template>
  <a class="skip-link" href="#main-content">跳到正文</a>
  <header :class="['site-header', { 'learning-header': frontmatter.learningReader }]">
    <div class="nav-shell">
      <a class="wordmark" href="/" :aria-label="`${siteConfig.brandName}首页`">
        <span class="wordmark-logo" aria-hidden="true">
          <img :src="siteConfig.logoPath" alt="" width="300" height="300">
        </span>
        <span><b>{{ siteConfig.brandName }}</b><small>{{ siteConfig.englishName }}</small></span>
      </a>
      <nav class="desktop-nav" aria-label="主导航">
        <a v-for="item in nav" :key="item.label" :href="item.href" :class="{ active: active(item.href) }">{{ item.label }}</a>
      </nav>
      <a class="nav-cta" :href="siteConfig.experienceUrl">免费体验</a>
      <button ref="menuButton" class="menu-button" type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen ? '关闭菜单' : '打开菜单'" @click="menuOpen = !menuOpen">
        <span></span><span></span>
      </button>
    </div>
    <nav v-if="menuOpen" id="mobile-menu" class="mobile-nav" aria-label="移动端导航">
      <a v-for="item in nav" :key="item.label" :href="item.href" @click="menuOpen = false">{{ item.label }}</a>
      <a class="button primary" :href="siteConfig.experienceUrl" @click="menuOpen = false">免费体验7库系统</a>
    </nav>
  </header>

  <main id="main-content" tabindex="-1" :class="['page-main', frontmatter.pageClass]">
    <LearningReader
      v-if="frontmatter.learningReader"
      :crumbs="crumbs"
      :course-id="frontmatter.learningCourse"
      :lesson-id="frontmatter.learningLesson"
      :toc-items="learningToc"
    ><Content /></LearningReader>
    <template v-else>
      <nav v-if="showBreadcrumb" class="breadcrumb" aria-label="面包屑">
        <ol>
          <li v-for="(crumb, index) in crumbs" :key="crumb.text">
            <a v-if="crumb.link" :href="crumb.link">{{ crumb.text }}</a>
            <span v-else :aria-current="index === crumbs.length - 1 ? 'page' : undefined">{{ crumb.text }}</span>
          </li>
        </ol>
      </nav>
      <div class="vp-doc"><Content /></div>
    </template>
  </main>

  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <p class="eyebrow">{{ siteConfig.englishName }}</p>
        <h2>{{ siteConfig.brandName }}</h2>
        <p>{{ siteConfig.tagline }}</p>
      </div>
      <div><h3>方法</h3><a href="/knowledge-os/">7库体系</a><a href="/learning/">学习路径</a><a href="/knowledge-os/positioning">定位库详情</a></div>
      <div><h3>了解</h3><a href="/cases/">演示案例</a><a href="/services/">课程与服务</a><a href="/#faq">常见问题</a></div>
      <div><h3>下一步</h3><a :href="siteConfig.experienceUrl">免费体验</a><a :href="siteConfig.diagnosisUrl">知识资产诊断</a><span>先看交付物与诊断前自检</span></div>
    </div>
    <div class="footer-bottom"><span>© 2026 启点 AI</span><span>内容更新：{{ siteConfig.updatedAt }}</span></div>
  </footer>
</template>
