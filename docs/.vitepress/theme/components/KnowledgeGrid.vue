<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { libraries } from '../../data/site'
defineProps<{ compact?: boolean }>()

const activeKey = ref<(typeof libraries)[number]['key']>('positioning')
const activeLibrary = computed(() => libraries.find(item => item.key === activeKey.value) || libraries[0])

const syncFromHash = () => {
  const key = window.location.hash.replace('#library-', '')
  if (libraries.some(item => item.key === key)) activeKey.value = key as typeof activeKey.value
}

onMounted(() => {
  syncFromHash()
  window.addEventListener('hashchange', syncFromHash)
})
onUnmounted(() => window.removeEventListener('hashchange', syncFromHash))

const selectLibrary = (key: (typeof libraries)[number]['key']) => {
  activeKey.value = key
  window.history.replaceState(null, '', `#library-${key}`)
}
</script>

<template>
  <div class="knowledge-switcher">
    <div class="switcher-heading">
      <p class="switcher-hint"><span aria-hidden="true">↘</span> 点击任意知识库，下方会显示它的输入、输出与第一项任务</p>
      <p class="switcher-status" aria-live="polite">当前查看：<b>{{ activeLibrary.name }}</b></p>
    </div>
    <div :class="['knowledge-grid', { compact }]">
      <article v-for="lib in libraries" :id="`library-${lib.key}`" :key="lib.key" :class="['knowledge-card', { active: activeKey === lib.key }]">
        <button class="knowledge-card-select" type="button" :aria-pressed="activeKey === lib.key" aria-controls="active-library-panel" @click="selectLibrary(lib.key)">
          <span class="card-index"><span>{{ lib.index }}</span><em>{{ lib.signal }}</em></span>
          <strong>{{ lib.name }}</strong>
          <span class="card-role">{{ lib.role }}</span>
          <span class="card-result"><span>业务结果</span><b>{{ lib.result }}</b></span>
        </button>
      </article>
    </div>
    <article id="active-library-panel" class="knowledge-detail-panel" aria-live="polite">
      <header>
        <span>{{ activeLibrary.index }} / {{ activeLibrary.signal }}</span>
        <div><p>当前知识库</p><h3>{{ activeLibrary.name }}</h3></div>
      </header>
      <div class="knowledge-detail-field"><span>主要输入</span><b>{{ activeLibrary.input }}</b></div>
      <div class="knowledge-detail-field"><span>主要输出</span><b>{{ activeLibrary.output }}</b></div>
      <div class="knowledge-detail-field"><span>第一项任务</span><b>{{ activeLibrary.firstTask }}</b></div>
      <a :href="activeLibrary.guideHref" :aria-label="activeLibrary.guideLabel">{{ activeLibrary.guideLabel }} <span aria-hidden="true">→</span></a>
    </article>
  </div>
</template>
