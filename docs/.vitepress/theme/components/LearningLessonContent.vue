<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { findLearningCourse, findLearningLesson, learningCourses } from '../data/learning'

const { frontmatter } = useData()
const course = computed(() => findLearningCourse(frontmatter.value.learningCourse))
const lesson = computed(() => findLearningLesson(frontmatter.value.learningCourse, frontmatter.value.learningLesson))
const lessonIndex = computed(() => course.value?.lessons.findIndex(item => item.id === lesson.value?.id) ?? -1)
const previousLesson = computed(() => lessonIndex.value > 0 ? course.value?.lessons[lessonIndex.value - 1] : undefined)
const nextLesson = computed(() => course.value && lessonIndex.value < course.value.lessons.length - 1 ? course.value.lessons[lessonIndex.value + 1] : undefined)
const nextCourse = computed(() => {
  const index = learningCourses.findIndex(item => item.id === course.value?.id)
  return index < 0 ? undefined : learningCourses[index + 1]
})
</script>

<template>
  <template v-if="course && lesson">
    <div class="learning-lesson-meta">
      <p class="learning-article-kicker">COURSE {{ course.index }} · LESSON {{ String(lessonIndex + 1).padStart(2, '0') }} · 预计 {{ lesson.duration }}</p>
      <span>第 {{ lessonIndex + 1 }} / {{ course.lessons.length }} 课</span>
    </div>
    <h1>{{ lesson.title }}</h1>
    <p class="learning-reader-lead">{{ lesson.summary }}</p>

    <section class="learning-course-context" aria-label="所属课程与练习">
      <div><small>所属一级课程</small><b>{{ course.title }}</b></div>
      <p>{{ course.description }}</p>
      <a href="#practice"><small>动手练习</small><b>查看样例与步骤 ↓</b></a>
    </section>

    <h2 id="goals">本课你会完成什么</h2>
    <div class="learning-goal-grid">
      <article v-for="(objective, index) in lesson.objectives" :key="objective"><span>{{ index + 1 }}</span><b>{{ objective }}</b></article>
    </div>

    <section id="deliverable" class="learning-deliverable-panel">
      <div><span>本课交付物</span><h2>{{ lesson.deliverable }}</h2><p>不要只完成阅读。请把这份成果保存在自己的正式项目位置，作为下一课的输入。</p></div>
      <div><span>完成标准</span><ul><li v-for="item in lesson.acceptance" :key="item">{{ item }}</li></ul></div>
    </section>

    <section v-for="section in lesson.sections" :key="section.id" class="learning-lesson-section">
      <h2 :id="section.id">{{ section.title }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
      <ul v-if="section.points"><li v-for="point in section.points" :key="point">{{ point }}</li></ul>
    </section>

    <section id="practice" class="learning-practice-card" aria-labelledby="learning-practice-title">
      <p class="learning-practice-kicker">动手练习 · 虚构答疑案例</p>
      <h2 id="learning-practice-title">{{ lesson.practice.title }}</h2>
      <div class="learning-practice-links">
        <a href="/practice/faq-sources.txt" download>下载练习资料（TXT）</a>
        <a href="/practice/faq-workbook.txt" download>下载练习工作单（TXT）</a>
      </div>
      <ol><li v-for="step in lesson.practice.steps" :key="step">{{ step }}</li></ol>
      <blockquote v-if="lesson.practice.prompt"><p><strong>示例指令：</strong>{{ lesson.practice.prompt }}</p></blockquote>
      <details class="learning-practice-example">
        <summary>查看参考成果与常见错误</summary>
        <p v-for="paragraph in lesson.practice.example" :key="paragraph">{{ paragraph }}</p>
        <p><strong>常见错误：</strong>{{ lesson.practice.pitfall }}</p>
      </details>
    </section>

    <nav class="learning-pager" aria-label="课时翻页">
      <a :href="previousLesson?.href || '/learning/'"><span>{{ previousLesson ? '上一课' : '返回' }}</span><b>← {{ previousLesson?.title || '学习路径' }}</b></a>
      <a :href="nextLesson?.href || nextCourse?.lessons[0].href || '/learning/'"><span>{{ nextLesson ? '下一课' : nextCourse ? '下一门课程' : '返回' }}</span><b>{{ nextLesson?.title || nextCourse?.title || '学习路径' }} →</b></a>
    </nav>
    <ContentMeta :updated="frontmatter.date_modified" />
  </template>
  <section v-else class="learning-content-error" role="alert">
    <h1>课程内容暂时无法读取</h1>
    <p>当前课时与课程目录没有正确对应。请返回学习路径重新选择课程。</p>
    <a class="button primary" href="/learning/">返回学习路径</a>
  </section>
</template>
