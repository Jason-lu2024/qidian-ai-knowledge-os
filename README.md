# 启点 AI · 知识资产增长系统

公开品牌官网、7库方法论、学习路径、演示案例、30分钟体验与课程服务站。当前交付是静态网站，不包含登录、支付、后台、表单提交或 SaaS 功能。

## 本地开发

```bash
npm install
npm run dev
```

开发服务器只监听 `127.0.0.1`。完整质量检查：

```bash
npm run check
```

该命令依次执行严格类型检查、源码链接检查、未完成标记检查、生产构建和静态产物检查。

## 参与贡献

1. 在 GitHub 上 Fork 本仓库，从 `main` 新建分支。
2. 修改所需页面或组件，运行 `npm ci` 和 `npm run check`。涉及页面布局时，也请用浏览器检查桌面和手机宽度。
3. 向本仓库的 `main` 提交 Pull Request，说明改了什么、如何验证。界面改动可附截图。

提交内容需可公开。客户资料、访问凭据、内部手册和项目记忆请留在本地。页面改动请遵循 [项目规则](AGENTS.md)。

## 正式构建

正式域名必须通过环境变量传入，不能使用默认域名或临时域名：

```bash
SITE_URL=https://<已确认的正式域名> npm run build:production
```

构建产物位于 `docs/.vitepress/dist/`。静态服务器需要同时支持目录路由和 VitePress 的 clean URL，例如 Nginx 的核心回退规则为：

```nginx
try_files $uri $uri/ $uri.html =404;
```

生产发布还需在服务器侧配置 HTTPS、缓存、安全响应头、访问日志和可回滚版本目录；这些配置必须结合实际域名、服务器路径与现有面板确认。

## 内容维护入口

- 页面正文：`docs/`
- 学习课程与课时数据：`docs/.vitepress/theme/data/learning.ts`
- 七库统一内容模型：`docs/.vitepress/theme/data/libraryDetails.ts`
- 品牌、价格与公共入口：`docs/.vitepress/data/site.ts`
- 主题组件与视觉系统：`docs/.vitepress/theme/`

演示案例必须继续标注为“演示案例”。真实预约方式未接入前，网站只展示诊断交付物与准备要求，不伪造联系方式或提交能力。
