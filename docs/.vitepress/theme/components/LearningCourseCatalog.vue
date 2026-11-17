<script setup lang="ts">
import { learningCourses } from '../data/learning'
</script>

<template>
  <div class="learning-course-catalog">
    <a v-for="course in learningCourses" :key="course.id" :href="course.lessons[0].href">
      <span>{{ course.index }}</span>
      <div><small>{{ course.lessons.length }} 个课时</small><h3>{{ course.title }}</h3><p>{{ course.description }}</p><em>最终成果：{{ course.outcome }}</em></div>
      <b>进入课程 →</b>
    </a>
  </div>
</template>
