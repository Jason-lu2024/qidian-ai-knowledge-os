<script setup lang="ts">
const steps = [
  { n: '01', title: '收集', copy: '捕捉一个客户问题' },
  { n: '02', title: '分类', copy: '进入问题库与素材库' },
  { n: '03', title: '调用', copy: 'AI读取定位与方法' },
  { n: '04', title: '生成', copy: '形成文章初稿' },
  { n: '05', title: '审核', copy: '人工校正事实与表达' },
  { n: '06', title: '回存', copy: '优质结果进入样本库' }
]
</script>

<template>
  <div class="flow-loop">
    <div v-for="(step, index) in steps" :key="step.n" class="flow-step"><span>{{ step.n }}</span><h3>{{ step.title }}</h3><p>{{ step.copy }}</p><i v-if="index < steps.length - 1" aria-hidden="true">→</i></div>
  </div>
</template>
