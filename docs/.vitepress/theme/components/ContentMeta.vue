<script setup lang="ts">
import { siteConfig } from '../../data/site'

withDefaults(defineProps<{ published?: string; updated?: string }>(), {
  published: '',
  updated: siteConfig.updatedAt
})
</script>

<template>
  <div class="content-meta">
    作者：{{ siteConfig.author }} · 内容审核：{{ siteConfig.reviewer }} ·
    <template v-if="published">首次发布：{{ published }} · </template>
    最近更新：{{ updated }}
  </div>
</template>
