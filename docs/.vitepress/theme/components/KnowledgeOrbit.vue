<script setup lang="ts">
import { libraries } from '../../data/site'
</script>

<template>
  <figure class="orbit-figure" aria-label="7库加AI联动示意：AI从七个知识库读取资料，生成业务结果，经人工审核后回存。">
    <div class="orbit-kicker">
      <span aria-hidden="true"></span>
      <b>7库联动示意</b>
      <em>METHOD FLOW · DEMO</em>
    </div>
    <div class="orbit-stage">
      <div class="orbit-ring ring-one"></div><div class="orbit-ring ring-two"></div>
      <div class="orbit-core"><small>QIDIAN AI</small><strong>Knowledge<br>OS</strong><em>跨库调用</em></div>
      <div v-for="(lib, index) in libraries" :key="lib.key" :class="['orbit-node', `node-${index + 1}`]"><i>{{ lib.index }}</i><span>{{ lib.name }}</span></div>
    </div>
    <div class="orbit-output" aria-label="知识联动流程">
      <div><span>01</span><b>知识输入</b><small>问题 · 素材 · 经验</small></div>
      <i aria-hidden="true">→</i>
      <div><span>02</span><b>跨库调用</b><small>定位 · 客户 · 方法</small></div>
      <i aria-hidden="true">→</i>
      <div><span>03</span><b>审核回存</b><small>内容 · 方案 · SOP</small></div>
    </div>
  </figure>
</template>
