import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import CTAGroup from './components/CTAGroup.vue'
import KnowledgeGrid from './components/KnowledgeGrid.vue'
import KnowledgeOrbit from './components/KnowledgeOrbit.vue'
import CaseExplorer from './components/CaseExplorer.vue'
import ServiceGrid from './components/ServiceGrid.vue'
import FlowLoop from './components/FlowLoop.vue'
import LearningLibraryGuide from './components/LearningLibraryGuide.vue'
import LearningLessonContent from './components/LearningLessonContent.vue'
import LearningCourseCatalog from './components/LearningCourseCatalog.vue'
import LibraryDetail from './components/LibraryDetail.vue'
import ExperienceLab from './components/ExperienceLab.vue'
import ContentMeta from './components/ContentMeta.vue'
import './styles.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('CTAGroup', CTAGroup)
    app.component('KnowledgeGrid', KnowledgeGrid)
    app.component('KnowledgeOrbit', KnowledgeOrbit)
    app.component('CaseExplorer', CaseExplorer)
    app.component('ServiceGrid', ServiceGrid)
    app.component('FlowLoop', FlowLoop)
    app.component('LearningLibraryGuide', LearningLibraryGuide)
    app.component('LearningLessonContent', LearningLessonContent)
    app.component('LearningCourseCatalog', LearningCourseCatalog)
    app.component('LibraryDetail', LibraryDetail)
    app.component('ExperienceLab', ExperienceLab)
    app.component('ContentMeta', ContentMeta)
  }
} satisfies Theme
