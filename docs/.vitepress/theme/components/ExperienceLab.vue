<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'

const scenarios = [
  {
    key: 'content', label: '内容生产', task: '回答一个客户高频问题，形成一篇可继续修改的内容初稿',
    libraries: ['定位库', '问题库', '素材库', '高分样本库'],
    input: '1条真实问题 + 1个观点或案例 + 1份表达样本', output: '一篇有依据、符合自身定位的内容初稿',
    prompt: '请根据我提供的定位、客户问题、真实素材和表达样本，生成一篇内容初稿。不要补写未提供的事实；标记仍需人工确认的判断；结尾列出本次调用的知识依据。'
  },
  {
    key: 'answer', label: '客户答疑', task: '把一个重复回答的问题，整理成边界清楚的标准答复',
    libraries: ['客户库', '问题库', '产品库', '方法库'],
    input: '1条客户原话 + 产品边界 + 已确认解决步骤', output: '一份可复用、可人工审核的客户答复',
    prompt: '请基于客户原话、产品边界和已确认方法，生成一份客户答复。先直接回答问题，再说明适用条件和下一步；不得承诺资料中不存在的效果、价格或服务范围。'
  },
  {
    key: 'proposal', label: '销售方案', task: '围绕一个真实业务场景，整理方案结构与交付边界',
    libraries: ['客户库', '问题库', '方法库', '产品库'],
    input: '客户场景 + 主要问题 + 服务内容与边界', output: '一份问题、方法、交付和边界一致的方案提纲',
    prompt: '请根据客户场景、核心问题、方法步骤与服务边界，生成销售方案提纲。区分已确认事实、建议方案和待确认事项；不得虚构客户数据、案例或效果。'
  },
  {
    key: 'sop', label: 'SOP沉淀', task: '把一次做成功的任务，整理成可复现的操作清单',
    libraries: ['素材库', '方法库', '产品库', '高分样本库'],
    input: '一次真实过程 + 关键判断 + 合格结果样本', output: '一份包含输入、步骤、检查点与异常处理的SOP草案',
    prompt: '请把这次成功过程整理为SOP草案，包含适用范围、输入、执行步骤、关键判断、验收标准和异常处理。无法从资料确认的步骤请标为“待验证”，不要自行补全。'
  }
] as const

const activeKey = ref<(typeof scenarios)[number]['key']>('content')
const active = computed(() => scenarios.find(item => item.key === activeKey.value) || scenarios[0])
const checked = ref([false, false, false, false])
const copyState = ref<'idle' | 'success' | 'error'>('idle')
let copyResetTimer: number | undefined
const complete = computed(() => checked.value.every(Boolean))

const handleScenarioKeydown = (event: KeyboardEvent, index: number) => {
  const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (!keys.includes(event.key)) return

  event.preventDefault()
  const lastIndex = scenarios.length - 1
  const nextIndex = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? lastIndex
      : event.key === 'ArrowLeft'
        ? (index - 1 + scenarios.length) % scenarios.length
        : (index + 1) % scenarios.length

  activeKey.value = scenarios[nextIndex].key
  const buttons = (event.currentTarget as HTMLButtonElement).parentElement
    ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
  window.requestAnimationFrame(() => buttons?.[nextIndex]?.focus())
}

const resetCopyState = () => {
  if (copyResetTimer) window.clearTimeout(copyResetTimer)
  copyResetTimer = undefined
  copyState.value = 'idle'
}

watch(activeKey, () => {
  checked.value = [false, false, false, false]
  resetCopyState()
})
onUnmounted(resetCopyState)

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(active.value.prompt)
    copyState.value = 'success'
  } catch {
    copyState.value = 'error'
  }
  copyResetTimer = window.setTimeout(resetCopyState, 2400)
}
</script>

<template>
  <section class="experience-lab" aria-labelledby="experience-lab-title">
    <div class="experience-lab-head">
      <div><span>GUIDED PRACTICE</span><h2 id="experience-lab-title">选择一个真实任务，完成最小闭环。</h2></div>
      <p><b>预计 30 分钟</b>站内不上传、保存或发送你的资料。</p>
    </div>

    <div class="experience-scenario-tabs" role="tablist" aria-label="体验场景">
      <button
        v-for="(item, index) in scenarios"
        :id="`experience-tab-${item.key}`"
        :key="item.key"
        type="button"
        role="tab"
        :aria-controls="'experience-scenario-panel'"
        :aria-selected="activeKey === item.key"
        :tabindex="activeKey === item.key ? 0 : -1"
        :class="{ active: activeKey === item.key }"
        @click="activeKey = item.key"
        @keydown="handleScenarioKeydown($event, index)"
      >
        {{ item.label }}
      </button>
    </div>

    <div
      id="experience-scenario-panel"
      role="tabpanel"
      :aria-labelledby="`experience-tab-${activeKey}`"
      tabindex="0"
    >
      <div class="experience-task-card">
        <div><span>本次任务</span><h3>{{ active.task }}</h3></div>
        <dl><div><dt>需要准备</dt><dd>{{ active.input }}</dd></div><div><dt>调用知识库</dt><dd>{{ active.libraries.join(' + ') }}</dd></div><div><dt>完成结果</dt><dd>{{ active.output }}</dd></div></dl>
      </div>

      <div class="experience-workspace">
        <ol class="experience-action-list">
          <li><span>01</span><div><b>确认任务和使用对象</b><p>写清楚结果给谁使用、解决什么问题，以及什么不能写。</p></div></li>
          <li><span>02</span><div><b>准备最少必要资料</b><p>只取完成任务所需的真实资料，并标记来源、版本、权限和不确定信息。</p></div></li>
          <li><span>03</span><div><b>在你正在使用的 AI 工具中执行</b><p>复制右侧提示词，再补充自己的资料。WorkBuddy、IMA或其他工具均可。</p></div></li>
          <li><span>04</span><div><b>人工审核并决定回存</b><p>逐项检查事实、边界、表达与复用价值。审核通过的结果可先存为候选，经过实际使用再评价。</p></div></li>
        </ol>
        <div class="experience-prompt-card">
          <div><span>PROMPT STARTER</span><button type="button" @click="copyPrompt">{{ copyState === 'success' ? '已复制' : copyState === 'error' ? '复制失败，请手动选择' : '复制提示词' }}</button></div>
          <p>{{ active.prompt }}</p>
          <small aria-live="polite">{{ copyState === 'error' ? '浏览器未允许写入剪贴板，请直接选择上方文字复制。' : '提示词只是起点。真实资料、业务判断和最终审核仍由你负责。' }}</small>
        </div>
      </div>

      <fieldset class="experience-review">
        <legend>结果验收：完成四项，才进入回存</legend>
        <label><input v-model="checked[0]" type="checkbox">事实和数字都能追溯到资料来源</label>
        <label><input v-model="checked[1]" type="checkbox">没有超出产品、授权或业务承诺边界</label>
        <label><input v-model="checked[2]" type="checkbox">表达符合使用对象、场景与品牌定位</label>
        <label><input v-model="checked[3]" type="checkbox">已经确定结果的回存位置与下一次用途</label>
      </fieldset>

      <div :class="['experience-result', { complete }]" role="status" aria-live="polite">
        <div><span>{{ complete ? '闭环已完成' : '等待验收' }}</span><b>{{ complete ? '把结果和评价依据一起保存。' : `已完成 ${checked.filter(Boolean).length} / 4 项检查` }}</b></div>
        <a :href="complete ? '/learning/knowledge-ai/review-store' : '#experience-lab-title'">{{ complete ? '学习审核与回存 →' : '继续完成检查' }}</a>
      </div>
    </div>
  </section>
</template>
