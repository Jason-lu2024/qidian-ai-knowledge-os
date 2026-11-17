<script setup lang="ts">
import { siteConfig } from '../../data/site'

withDefaults(defineProps<{ primary?: string; secondary?: string; text?: string; primaryHref?: string; secondaryHref?: string; textHref?: string; align?: 'left' | 'center' }>(), {
  primary: '免费体验7库系统', secondary: '查看演示案例', text: '查看诊断交付物',
  primaryHref: siteConfig.experienceUrl, secondaryHref: '/cases/', textHref: siteConfig.diagnosisUrl, align: 'left'
})
</script>

<template>
  <div :class="['cta-group', `align-${align}`]">
    <a class="button primary" :href="primaryHref">{{ primary }}<span aria-hidden="true">↗</span></a>
    <a class="button secondary" :href="secondaryHref">{{ secondary }}</a>
    <a class="text-link" :href="textHref">{{ text }}<span aria-hidden="true">→</span></a>
  </div>
</template>
