export const siteConfig = {
  brandName: '启点 AI · 知识资产增长系统',
  englishName: 'Qidian AI · Knowledge OS',
  logoPath: '/brand/qidian-ai-logo-nav.webp',
  descriptor: '7库驱动的知识资产增长系统',
  tagline: '让经验能沉淀，内容能生产，方法能复用。',
  experienceUrl: '/experience/',
  diagnosisUrl: '/services/#diagnosis',
  author: '启点 AI 内容团队',
  reviewer: '启点 AI 内容团队',
  updatedAt: '2026-09-11',
  prices: {
    bootcamp: '¥1,980',
    coaching: '¥5,980—9,800',
    enterprise: '¥29,800 起'
  }
} as const

export const libraries = [
  { index: '01', key: 'positioning', name: '定位库', role: '明确你是谁、服务谁，以及为什么选择你。', result: '形成稳定定位与表达口径', signal: '方向', input: '业务选择、优势、边界与价值主张', output: '品牌介绍、内容边界与销售口径', firstTask: '整理一份经过确认的一句话定位', guideLabel: '查看定位库完整详情', guideHref: '/knowledge-os/positioning' },
  { index: '02', key: 'customer', name: '客户库', role: '沉淀真实客户画像、场景、语言与决策依据。', result: '让内容与方案更贴近客户', signal: '对象', input: '访谈、咨询记录、客户原话与决策原因', output: '客户画像、场景判断与需求洞察', firstTask: '整理 3 条真实客户原话', guideLabel: '查看客户库完整详情', guideHref: '/knowledge-os/customer' },
  { index: '03', key: 'problem', name: '问题库', role: '持续收集客户高频问题和真实业务卡点。', result: '获得长期选题与销售线索', signal: '需求', input: '高频提问、异议、搜索词与业务卡点', output: '选题池、FAQ 与需求优先级', firstTask: '收集本周被问到最多的 5 个问题', guideLabel: '查看问题库完整详情', guideHref: '/knowledge-os/problem' },
  { index: '04', key: 'material', name: '素材库', role: '保存故事、观点、数据、案例与过程证据。', result: '降低内容生产启动成本', signal: '证据', input: '故事、观点、数据、截图与案例证据', output: '内容论据、案例片段与表达素材', firstTask: '把一个真实经历整理成素材卡', guideLabel: '查看素材库完整详情', guideHref: '/knowledge-os/material' },
  { index: '05', key: 'method', name: '方法库', role: '把经验整理成步骤、标准、清单与框架。', result: '让个人经验可以复用', signal: '方法', input: '项目复盘、步骤、标准、清单与框架', output: 'SOP、课程结构与操作指南', firstTask: '复盘一次成功任务的关键步骤', guideLabel: '查看方法库完整详情', guideHref: '/knowledge-os/method' },
  { index: '06', key: 'product', name: '产品库', role: '统一产品、服务、边界、价格与交付说明。', result: '提高方案与销售一致性', signal: '交付', input: '服务说明、范围、价格与常见异议', output: '销售方案、产品说明与答疑口径', firstTask: '写清一个服务的适合对象与边界', guideLabel: '查看产品库完整详情', guideHref: '/knowledge-os/product' },
  { index: '07', key: 'samples', name: '高分样本库', role: '保存经过验证的优质结果和评价标准。', result: '让 AI 输出持续接近你的标准', signal: '标准', input: '经过审核的文章、方案、答复与反馈', output: '质量标准、风格参照与复用模板', firstTask: '选出一份高质量结果并写明好在哪里', guideLabel: '查看高分样本库完整详情', guideHref: '/knowledge-os/samples' }
] as const

export const servicePlans = [
  {
    key: 'bootcamp', label: '14天训练营', price: siteConfig.prices.bootcamp,
    audience: '想自己搭建系统、需要节奏和反馈的一人公司与创作者',
    result: '搭出基础 7 库，并跑通 1 个真实业务闭环',
    deliverables: ['7库盘点与结构模板', '14天任务路线', '关键作业反馈', '一次闭环验收'],
    boundary: '以训练和反馈为主，不包含完整代搭；开营、退款与顺延规则以正式服务协议为准。'
  },
  {
    key: 'coaching', label: '3个月1对1陪跑', price: siteConfig.prices.coaching,
    audience: '已有业务与资料，希望按自身场景深度落地的咨询师和小团队',
    result: '完成个性化知识系统，并在真实使用中持续校正',
    deliverables: ['业务与资料诊断', '个性化7库设计', '重点工作流陪跑', '阶段复盘与优化'],
    boundary: '会议次数、代搭范围、响应时间和修改轮次在诊断后写入正式服务协议。'
  },
  {
    key: 'enterprise', label: '企业7库搭建', price: siteConfig.prices.enterprise,
    audience: '需要沉淀团队经验、减少重复沟通与交接损耗的中小企业',
    result: '完成盘点、系统设计、搭建、培训与阶段验收',
    deliverables: ['部门知识盘点', '系统与权限设计', '核心知识库搭建', '团队培训与验收'],
    boundary: '报价取决于部门、资料量、权限和定制范围，不包含未确认的软件开发。'
  }
] as const
