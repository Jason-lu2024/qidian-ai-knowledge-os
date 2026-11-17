<script setup lang="ts">
import { servicePlans } from '../../data/site'
</script>

<template>
  <div class="service-grid">
    <article v-for="(plan, index) in servicePlans" :key="plan.key" :class="['service-card', { featured: index === 1 }]">
      <div class="service-head"><span>0{{ index + 1 }} / SERVICE</span><em v-if="index === 1">深度落地</em></div>
      <h3>{{ plan.label }}</h3><p class="price">{{ plan.price }}</p>
      <p class="service-audience"><b>适合谁</b>{{ plan.audience }}</p>
      <p class="service-result"><b>核心结果</b>{{ plan.result }}</p>
      <ul><li v-for="item in plan.deliverables" :key="item">{{ item }}</li></ul>
      <p class="boundary">服务边界：{{ plan.boundary }}</p>
      <a class="button secondary" href="/services/#diagnosis">了解详情</a>
    </article>
  </div>
</template>
