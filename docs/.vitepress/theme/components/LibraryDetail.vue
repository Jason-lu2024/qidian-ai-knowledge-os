<script setup lang="ts">
import { computed } from 'vue'
import { findLibraryDetail, libraryDetails } from '../data/libraryDetails'

const props = defineProps<{ libraryId: string }>()
const detail = computed(() => findLibraryDetail(props.libraryId) || libraryDetails[0])
const detailIndex = computed(() => libraryDetails.findIndex(item => item.id === detail.value.id))
const previous = computed(() => detailIndex.value > 0 ? libraryDetails[detailIndex.value - 1] : undefined)
const next = computed(() => detailIndex.value < libraryDetails.length - 1 ? libraryDetails[detailIndex.value + 1] : undefined)
</script>

<template>
  <header class="page-hero detail-hero">
    <p class="eyebrow">LIBRARY {{ detail.index }} / {{ detail.english }}</p>
    <div class="library-badge" aria-hidden="true">{{ detail.index }}</div>
    <h1>{{ detail.name }}：<br class="desktop-break"><strong>{{ detail.headline }}</strong></h1>
    <p class="page-summary">{{ detail.summary }}</p>
    <CTAGroup primary="开始一次最小盘点" secondary="返回7库总览" secondary-href="/knowledge-os/" />
  </header>

  <div class="detail-layout">
    <aside class="detail-toc">
      <span>本页目录</span>
      <a href="#definition">这个库是什么</a><a href="#problem">解决什么问题</a><a href="#store">存什么</a>
      <a href="#directory">实例目录</a><a href="#enterprise">企业映射</a><a href="#examples">示例资料</a>
      <a href="#ai-tasks">AI任务</a><a href="#input-output">完整示例</a><a href="#linkage">库间联动</a>
      <a href="#governance">治理维护</a><a href="#faq">常见问题</a>
    </aside>

    <div class="detail-content">
      <section id="definition" class="detail-section">
        <h2>{{ detail.name }}是什么</h2><p>{{ detail.definition }}</p>
      </section>

      <section id="problem" class="detail-section">
        <h2>解决什么问题</h2>
        <div class="two-col"><article><h3>没有{{ detail.name }}时</h3><ul><li v-for="item in detail.before" :key="item">{{ item }}</li></ul></article><article><h3>建立{{ detail.name }}后</h3><ul><li v-for="item in detail.after" :key="item">{{ item }}</li></ul></article></div>
      </section>

      <section id="store" class="detail-section">
        <h2>应该存什么，不应该存什么</h2>
        <div class="library-boundary-grid">
          <article><span>SHOULD STORE</span><h3>正式归入这个库</h3><ul><li v-for="item in detail.store" :key="item">{{ item }}</li></ul></article>
          <article><span>KEEP OUT</span><h3>不要混入这个库</h3><ul><li v-for="item in detail.notStore" :key="item">{{ item }}</li></ul></article>
        </div>
      </section>

      <section id="directory" class="detail-section">
        <h2>一人公司 / 个人IP版实例目录</h2>
        <p class="section-answer">以下目录来自当前实际使用结构，用于展示内容边界，不要求企业照搬同名文件夹。</p>
        <div class="library-directory-grid">
          <article v-for="item in detail.directory" :key="item.code"><span>{{ item.code }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></article>
        </div>
      </section>

      <section id="enterprise" class="detail-section">
        <h2>企业版如何映射</h2>
        <div class="enterprise-mapping"><span>ENTERPRISE MAPPING</span><p>{{ detail.enterpriseMapping }}</p><small>七库是业务知识语义框架，最终物理目录需要结合业务域、流程、部门、权限与现有工具决定。</small></div>
      </section>

      <section id="examples" class="detail-section">
        <h2>示例资料</h2>
        <div class="library-example-table" role="table" :aria-label="`${detail.name}示例资料`">
          <div class="library-example-head" role="row"><span role="columnheader">示例资料</span><span role="columnheader">关键内容</span><span role="columnheader">使用场景</span></div>
          <div v-for="item in detail.examples" :key="item.name" class="library-example-row" role="row"><b role="cell">{{ item.name }}</b><span role="cell">{{ item.content }}</span><span role="cell">{{ item.use }}</span></div>
        </div>
      </section>

      <section id="ai-tasks" class="detail-section">
        <h2>AI可以完成的任务</h2><div class="task-chips"><span v-for="task in detail.aiTasks" :key="task">{{ task }}</span></div>
      </section>

      <section id="input-output" class="detail-section">
        <h2>一次“输入—提示—输出”示例</h2>
        <div class="prompt-example"><div><span>INPUT</span><p>{{ detail.prompt.input }}</p></div><div><span>PROMPT</span><p>{{ detail.prompt.instruction }}</p></div><div><span>OUTPUT</span><p>{{ detail.prompt.output }}</p></div></div>
      </section>

      <section id="linkage" class="detail-section">
        <h2>与其他知识库的联动</h2><p>{{ detail.linkage }}</p>
      </section>

      <section id="governance" class="detail-section">
        <h2>治理与维护</h2>
        <div class="two-col governance-cards"><article><span>治理原则</span><p>{{ detail.governance }}</p></article><article><span>维护频率</span><p>{{ detail.maintenance }}</p></article></div>
      </section>

      <section id="faq" class="detail-section">
        <h2>常见问题</h2>
        <details v-for="(item, index) in detail.faqs" :key="item.question" :open="index === 0"><summary>{{ item.question }}</summary><p>{{ item.answer }}</p></details>
      </section>
    </div>
  </div>

  <nav class="library-pager" aria-label="知识库详情导航">
    <a v-if="previous" :href="`/knowledge-os/${previous.id}`"><span>上一个知识库</span><b>← {{ previous.name }}</b></a><span v-else></span>
    <a v-if="next" :href="`/knowledge-os/${next.id}`"><span>下一个知识库</span><b>{{ next.name }} →</b></a><a v-else href="/knowledge-os/"><span>回到总览</span><b>7库体系 →</b></a>
  </nav>

  <section class="inline-cta"><p class="eyebrow">NEXT STEP</p><h2>{{ detail.nextTitle }}</h2><p>{{ detail.nextDescription }}</p><CTAGroup primary="开始免费体验" secondary="查看诊断交付物" secondary-href="/services/#diagnosis" /></section>

  <ContentMeta />
</template>
