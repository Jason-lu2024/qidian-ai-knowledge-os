<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { findLearningCourse, findLearningLesson, learningCourses, totalLearningLessons } from '../data/learning'

type TocItem = { title: string; href: string }

const props = withDefaults(defineProps<{
  crumbs: Array<{ text: string; link?: string }>
  courseId?: string
  lessonId?: string
  tocItems?: TocItem[]
}>(), {
  courseId: '',
  lessonId: '',
  tocItems: () => []
})

const query = ref('')
const directoryOpen = ref(false)
const expandedCourse = ref(props.courseId)
const currentHash = ref('')

const activeCourse = computed(() => findLearningCourse(props.courseId))
const activeLesson = computed(() => findLearningLesson(props.courseId, props.lessonId))
const lessonIndex = computed(() => activeCourse.value?.lessons.findIndex(lesson => lesson.id === props.lessonId) ?? -1)
const showBreadcrumb = computed(() => props.crumbs.length >= 3)

const resolvedToc = computed<TocItem[]>(() => {
  if (!activeLesson.value) return props.tocItems
  return [
    { title: '本课目标', href: '#goals' },
    { title: '交付与验收', href: '#deliverable' },
    ...activeLesson.value.sections.map(section => ({ title: section.title, href: `#${section.id}` })),
    { title: '动手练习', href: '#practice' }
  ]
})

const filteredCourses = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return learningCourses
  return learningCourses.flatMap(course => {
    const courseMatches = `${course.title}${course.subtitle}`.toLowerCase().includes(keyword)
    const lessons = courseMatches ? course.lessons : course.lessons.filter(lesson => lesson.title.toLowerCase().includes(keyword))
    return lessons.length ? [{ ...course, lessons }] : []
  })
})

const courseIsOpen = (courseId: string) => Boolean(query.value.trim()) || expandedCourse.value === courseId
const toggleCourse = (courseId: string) => { expandedCourse.value = expandedCourse.value === courseId ? '' : courseId }

const syncHash = () => {
  currentHash.value = window.location.hash || resolvedToc.value[0]?.href || ''
  directoryOpen.value = false
}

watch(() => props.courseId, courseId => {
  expandedCourse.value = courseId
  directoryOpen.value = false
})
watch(resolvedToc, () => syncHash())

onMounted(() => {
  syncHash()
  window.addEventListener('hashchange', syncHash)
})
onUnmounted(() => window.removeEventListener('hashchange', syncHash))
</script>

<template>
  <div class="learning-reader">
    <button class="learning-directory-toggle" type="button" :aria-expanded="directoryOpen" aria-controls="learning-directory" @click="directoryOpen = !directoryOpen">
      <span>课程目录</span><b>{{ directoryOpen ? '关闭' : '展开' }}</b>
    </button>

    <aside id="learning-directory" :class="['learning-reader-sidebar', { open: directoryOpen }]">
      <div class="learning-sidebar-head">
        <span>LEARNING PATH</span>
        <h2>课程目录</h2>
        <p>一级选课程，二级进入具体课时</p>
      </div>
      <label class="learning-search">
        <span class="learning-search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>
        </span>
        <input v-model="query" type="search" placeholder="搜索课程与课时" aria-label="筛选课程与课时" />
      </label>
      <nav aria-label="学习课程目录" class="learning-course-tree">
        <section v-for="course in filteredCourses" :key="course.id" :class="['learning-course', { active: course.id === courseId, open: courseIsOpen(course.id) }]">
          <div class="learning-course-head">
            <a :href="course.lessons[0].href" class="learning-course-link" :aria-current="course.id === courseId ? 'page' : undefined">
              <b>{{ course.index }}</b>
              <span><strong>{{ course.title }}</strong><small>{{ course.subtitle }}</small></span>
              <em>{{ course.lessons.length }} 课</em>
            </a>
            <button v-if="!query.trim()" type="button" :aria-expanded="courseIsOpen(course.id)" :aria-label="`${courseIsOpen(course.id) ? '收起' : '展开'}${course.title}`" @click="toggleCourse(course.id)">
              <svg :class="{ expanded: courseIsOpen(course.id) }" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m7 10 5 5 5-5"/></svg>
            </button>
          </div>
          <div v-if="courseIsOpen(course.id)" class="learning-course-lessons">
            <a v-for="(lesson, index) in course.lessons" :key="lesson.href" :href="lesson.href" :class="{ active: lesson.id === lessonId }" :aria-current="lesson.id === lessonId ? 'page' : undefined">
              <b>{{ String(index + 1).padStart(2, '0') }}</b><span>{{ lesson.title }}</span>
            </a>
          </div>
        </section>
      </nav>
      <div v-if="!filteredCourses.length" class="learning-empty" role="status">没有匹配的课程或课时</div>
      <div class="learning-path-summary"><b>5 门公开课程 · {{ totalLearningLessons }} 个课时</b><p>每课都有交付物与完成标准；课程内容会持续补充，目录结构保持稳定。</p></div>
    </aside>

    <article class="learning-reader-content">
      <nav v-if="showBreadcrumb" class="learning-reader-breadcrumb" aria-label="面包屑">
        <ol>
          <li v-for="(crumb, index) in crumbs" :key="crumb.text">
            <a v-if="crumb.link" :href="crumb.link">{{ crumb.text }}</a>
            <span v-else :aria-current="index === crumbs.length - 1 ? 'page' : undefined">{{ crumb.text }}</span>
          </li>
        </ol>
      </nav>
      <div class="vp-doc"><slot /></div>
    </article>

    <aside class="learning-reader-toc">
      <h2>{{ activeLesson ? '本课目录' : '本页目录' }}</h2>
      <nav :aria-label="activeLesson ? '本课目录' : '本页目录'">
        <a v-for="item in resolvedToc" :key="item.href" :href="item.href" :class="{ active: currentHash === item.href }">{{ item.title }}</a>
      </nav>
      <div v-if="activeCourse && activeLesson" class="learning-course-progress">
        <span>所属课程</span><b>{{ activeCourse.title }}</b>
        <small>第 {{ lessonIndex + 1 }} / {{ activeCourse.lessons.length }} 课</small>
      </div>
      <div class="learning-toc-note"><b>右侧只导航当前内容</b><p>左侧负责课程与课时，右侧只显示当前这一课的正文小节。</p></div>
    </aside>
  </div>
</template>
