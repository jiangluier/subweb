<div align="center">
  <h1>☁️ Cloudflare Pages 部署指南</h1>
  <p>无需服务器，轻松部署你的订阅转换前端</p>
</div>

---

## 📖 概述

本项目原生支持部署到 **Cloudflare Pages**，并支持通过环境变量动态修改配置（替代 Docker 的 `start.sh`）。

> 💡 全套服务均可部署于 Cloudflare 云端，完全免费、无需 VPS

---

## 🚀 部署步骤

### 1. Fork 项目

将 [Aethersailor/subweb](https://github.com/Aethersailor/subweb) Fork 到你的 GitHub 账号。

### 2. 连接 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Pages**
3. 点击 **Create** → **Connect to Git**
4. 选择你 Fork 的 `subweb` 仓库

### 3. 配置构建设置

在 **Build settings** 中填写：

| 配置项 | 值 |
| :--- | :--- |
| **Framework preset** | `Vue.js` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### 4. 部署

点击 **Save and Deploy**，等待构建完成即可。

---

## 🌐 自定义域名

部署完成后，Cloudflare 会分配一个 `*.pages.dev` 的默认域名。如需使用自定义域名，请按以下步骤操作：

### 前提条件

- 你的域名已托管在 Cloudflare（即 DNS 由 Cloudflare 管理）

### 配置步骤

1. 进入你的 Pages 项目页面
2. 点击 **Custom domains** 标签
3. 点击 **Set up a custom domain**
4. 输入你想使用的域名（如 `sub.example.com`）
5. 点击 **Continue**
6. Cloudflare 会自动添加 DNS 记录，点击 **Activate domain**

### DNS 记录说明

Cloudflare 会自动创建一条 CNAME 记录：

| 类型 | 名称 | 内容 |
| :--- | :--- | :--- |
| CNAME | `sub` | `your-project.pages.dev` |

> 💡 **提示**：如果域名不在 Cloudflare 管理，你需要手动在域名服务商处添加上述 CNAME 记录，然后回到 Pages 验证。

### SSL 证书

Cloudflare 会自动为自定义域名签发免费的 SSL 证书，无需额外配置。证书签发通常在几分钟内完成。

---

## ⚙️ 环境变量配置

在 Cloudflare Pages 项目的 **Settings** → **Environment variables** 中，可以添加以下变量来覆盖默认配置：

### 基础配置

| 变量名 | 描述 | 默认值 |
| :--- | :--- | :--- |
| `SITE_NAME` | 网站标题 | `Subconverter Web` |
| `API_URL` | 后端 API 地址 | `http://127.0.0.1:25500` |
| `SHORT_URL` | 短链接服务地址 | `https://s.asailor.org` |
| `ENABLE_SHORT_URL` | 是否启用短链接功能 | `true` |

### 进阶配置（JSON 格式）

如需配置多个后端或自定义远程配置列表，可使用 **JSON 格式**字符串：

| 变量名 | 描述 | 示例值 |
| :--- | :--- | :--- |
| `API_BACKENDS` | 自定义后端列表（覆盖 `API_URL`） | 见下方示例 |
| `REMOTE_CONFIG` | 自定义远程配置列表 | 见下方示例 |
| `MENU_ITEM` | 自定义顶部菜单 | 见下方示例 |

#### 示例：`API_BACKENDS`

```json
[
  {"name": "主后端", "url": "https://api.example.com"},
  {"name": "备用后端", "url": "https://bak.example.com"}
]
```

#### 示例：`REMOTE_CONFIG`

```json
[
  {"text": "ACL4SSR 默认规则", "value": "https://raw.githubusercontent.com/..."},
  {"text": "自用规则", "value": "https://your-config-url.com/config.ini"}
]
```

#### 示例：`MENU_ITEM`

```json
[
  {"title": "Telegram 群组", "link": "https://t.me/your_group", "target": "_blank"},
  {"title": "GitHub", "link": "https://github.com/Aethersailor", "target": "_blank"}
]
```

> ⚠️ **注意**：修改环境变量后，需要点击 **Retry deployment** 触发重新部署才能生效。

---

## 🔧 原理说明

项目包含 `functions/conf/config.js.js` 文件，这是一个 **Cloudflare Pages Function**。

工作流程：

1. 浏览器请求 `/conf/config.js`
2. Pages Function 拦截该请求
3. 读取环境变量，动态生成配置代码
4. 返回定制化的 JavaScript 配置

这使得无需修改代码即可实现配置自定义。

---

## 🔗 相关链接

- [📌 SubWeb 主项目](https://github.com/Aethersailor/subweb)
- [🔗 配套短链接服务](https://github.com/Aethersailor/cf-shortlink-worker)
- [📜 自定义分流规则](https://github.com/Aethersailor/Custom_OpenClash_Rules)

---

<div align="center">
  <sub>返回 <a href="README.md">README</a></sub>
</div>
