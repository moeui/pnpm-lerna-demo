## 创建项目

- lerna 初始化项目

    lerna init

- 修改 lerna.json 添加 pnpm 管理器

    {
    "$schema": "node_modules/lerna/schemas/lerna-schema.json",
    "version": "0.0.0",
    "npmClient": "pnpm"
    }

- 初始化包

    pnpm init

## 依赖安装

    pnpm i

## 添加包

    pnpm add typescript -w -D