# Lightrans Web

Lightrans Web 是一款基于AI的轻量级网页翻译工具，支持多种语言互译，使用Qwen、Hunyuan等先进大模型，提供高质量翻译服务。

该项目的浏览器插件版见：[轻量翻译](https://github.com/W4J1e/Lightrans)

## 功能特性

- 🚀 支持多种语言互译（英语、中文、日语、韩语、法语、西班牙语、德语、俄语等）
- 🤖 集成多种先进AI翻译模型
- 🔄 智能互译模式，自动识别中英文并切换目标语言
- 📋 一键复制翻译结果
- 🌐 响应式设计，适配不同设备
- 🎨 简洁美观的用户界面

## 技术栈

- React
- TypeScript
- Vite
- AI翻译模型（Qwen、Hunyuan等）

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 使用说明

1. 在左侧输入框中输入要翻译的文本
2. 选择源语言和目标语言（默认自动检测源语言）
3. 选择要使用的翻译模型
4. 点击「翻译」按钮开始翻译
5. 翻译结果会显示在右侧，可点击「复制」按钮复制到剪贴板

## 支持的语言

- 自动检测
- 英语（en）
- 中文（zh-CN）
- 日语（ja）
- 韩语（ko）
- 法语（fr）
- 西班牙语（es）
- 德语（de）
- 俄语（ru）

## 支持的模型

- tencent/Hunyuan-MT-7B
- 其他可用模型（取决于AI翻译器配置）

## 项目结构

```
lightrans_web/
├── src/
│   ├── translators/      # 翻译器相关代码
│   ├── assets/            # 静态资源
│   ├── App.tsx            # 主应用组件
│   ├── App.css            # 应用样式
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── index.html             # HTML模板
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 贡献

欢迎提交Issue和Pull Request来帮助改进这个项目！

## 许可证

MIT License

## 作者

- [w4j1e](https://hin.cool)

## 项目地址

- [GitHub](https://github.com/W4J1e/lightran_web)