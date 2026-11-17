<script setup lang="ts">
import { libraries } from '../../data/site'
</script>

<template>
  <div class="learning-library-list">
    <article v-for="lib in libraries" :id="`library-${lib.key}`" :key="lib.key" class="learning-library-row">
      <div class="learning-library-title"><span>{{ lib.index }} / {{ lib.signal }}</span><h3>{{ lib.name }}</h3><p>{{ lib.role }}</p></div>
      <div class="learning-library-field"><span>先放什么</span><b>{{ lib.input }}</b></div>
      <div class="learning-library-field"><span>第一次任务</span><b>{{ lib.firstTask }}</b></div>
      <a :href="lib.guideHref">查看完整详情 <span aria-hidden="true">→</span></a>
    </article>
  </div>
</template>
