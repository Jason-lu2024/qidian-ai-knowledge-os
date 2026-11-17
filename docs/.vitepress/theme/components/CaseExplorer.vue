<script setup lang="ts">
import { computed, ref } from 'vue'
const filter = ref('all')
const filters = [{ key: 'all', label: '全部场景' }, { key: 'solo', label: '一人公司' }, { key: 'consulting', label: '咨询培训' }, { key: 'sme', label: '中小企业' }]
const cases = [
  { type: 'solo', no: 'CASE 01', title: '从散乱资料到稳定内容生产', problem: '选题依赖临时灵感，历史资料难以再次调用。', libs: ['定位库', '问题库', '素材库', '高分样本库'], flow: '客户问题 → 匹配素材 → 生成初稿 → 人工审核 → 回存样本', result: '形成一套可重复执行的内容生产路径。' },
  { type: 'consulting', no: 'CASE 02', title: '从个人经验到可复制方法', problem: '交付依赖个人记忆，新成员难以复现判断过程。', libs: ['客户库', '方法库', '产品库'], flow: '复盘项目 → 提炼步骤 → 形成清单 → 校验边界', result: '把隐性经验整理成可培训、可复用的方法。' },
  { type: 'sme', no: 'CASE 03', title: '从员工经验到团队知识资产', problem: '同类问题重复沟通，人员变化会带走关键经验。', libs: ['问题库', '方法库', '产品库', '高分样本库'], flow: '收集问题 → 统一口径 → 生成答疑 → 审核发布 → 更新版本', result: '建立团队可查、可用、可持续更新的知识入口。' }
]
const visible = computed(() => filter.value === 'all' ? cases : cases.filter(item => item.type === filter.value))
</script>

<template>
  <div class="case-filter" role="group" aria-label="按用户类型筛选案例">
    <button v-for="item in filters" :key="item.key" type="button" :class="{ active: filter === item.key }" :aria-pressed="filter === item.key" @click="filter = item.key">{{ item.label }}</button>
  </div>
  <div class="case-grid">
    <article v-for="item in visible" :key="item.no" class="case-card">
      <div class="case-top"><span>{{ item.no }}</span><em>演示案例</em></div>
      <h3>{{ item.title }}</h3>
      <dl><div><dt>原问题</dt><dd>{{ item.problem }}</dd></div><div><dt>使用知识库</dt><dd class="tag-list"><span v-for="lib in item.libs" :key="lib">{{ lib }}</span></dd></div><div><dt>AI 联动</dt><dd>{{ item.flow }}</dd></div><div><dt>结果摘要</dt><dd>{{ item.result }}</dd></div></dl>
      <a v-if="item.type === 'solo'" href="/cases/#full-case">查看内容生产的完整演示 <span aria-hidden="true">→</span></a>
    </article>
  </div>
</template>
