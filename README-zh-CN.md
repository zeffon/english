Language : [English](./README.md) | 简体中文

<h1 align="center">monorepo</h1>

这是一个单体仓库模板

> 该模板来自 [vite](https://github.com/vitejs/vite) 项目。

## 使用

### 替换名称变量

`your_repo_name` 是该 **github** 仓库名称
`project_name` 是该仓库 `packages/project_name` 项目名称

使用该单体仓库模板时，

1. 请全局替换 `your_repo_name` -> `你的 **github** 仓库名称`
2. 请全局替换 `project_name` -> `packages 目录下项目名称`

### 配置 github 项目中 Actions 密钥

> 如果你不需要将项目进行发布，可以不需要进行配置 Actions 密钥，跳过该环节。

在 `monorepo` 项目中发布时需要两个 Actions 密钥变量支持。
一个是 Github 的授权令牌 `ACCESS_TOKEN`，另一个是发布到 NPM 上的 授权令牌 `NPM_TOKEN`。
需要在 `Github -> 当前项目 -> Settings -> Secrets -> Actions` 中添加密钥变量值。
这两个的名称分别是 **`ACCESS_TOKEN`** 和 **`NPM_TOKEN`**，对应的 value 获取方式如下。

- 获取的 **`ACCESS_TOKEN`** 的方式，参见[该文档](https://docs.github.com/cn/developers/apps/managing-github-apps/editing-a-github-apps-permissions)
- 获取的 **`NPM_TOKEN`** 的方式，参见[该文档](https://docs.npmjs.com/creating-and-viewing-access-tokens)

> 如果要采用其它变量名，记得更改项目中 `publish.yml` 和 `release-tag.yml` 对应的变量名。

### 发布项目

发布项目很简单，只需要在控制台中运行 `pnpm release` 命令，即可运行 `release.ts` 脚本。
通过选择所发布的版本号，会自动创建对应版本的`tag`，脚本也会自动提交 `commit` 和 `tag`。
提交到 github，会触发对应 workflow actions `publish.yml` 和 `release-tag.yml`。

- `publish.yml` 会将我们所需要发布的包发布到 NPM 上。（需要配置`NPM_TOKEN`）
- `release-tag.yml` 会帮助我们创建对应 Tag 版本信息。（需要配置`ACCESS_TOKEN`）

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
