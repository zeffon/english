Language : English | [简体中文](./README-zh-CN.md)

<h1 align="center">monorepo</h1>

This is a monomer repository (monorepo) template.

> This template is from the [vite](https://github.com/vitejs/vite) project.

## Usage

### Replace Name Vars

`your_repo_name` is your **github** repository name
`project_name` repository's `packages/project_name` project name

when you use this monorepo template :

1. please replace all `your_repo_name` to `your github repository name`
2. please replace all `project_name` to `packages's project name`

### Set Github Actions Secrets

> Tip: If you do not need to publish the project, you do not need to configure the Actions Secrets and skip this link.

Two Actions key variable support is required when publishing in the `monorepo` project.

One is the Github authorization token `ACCESS_TOKEN`, and the other is the authorization token `NPM_TOKEN` published on NPM.

The secret variable value needs to be added in `Github -> Current Project -> Settings -> Secrets -> Actions`.

The names of these two are **`ACCESS_TOKEN`** and **`NPM_TOKEN`**, and the corresponding value is obtained as follows.

- How to get **`ACCESS_TOKEN`**，See [this Docs](https://docs.github.com/en/developers/apps/managing-github-apps/editing-a-github-apps-permissions)
- How to get **`NPM_TOKEN`**，See [this Docs](https://docs.npmjs.com/creating-and-viewing-access-tokens)

> If you want to use other variable names, remember to change the variable names in `publish.yml` and `release-tag.yml` in your project.

### Publish Project

Publish project is as simple as running the `release.ts` script by running the `pnpm release` command in the console.

By selecting the released version number, the `tag` of the corresponding version will be automatically created, and the script will also automatically submit the `commit` and` tag`.

Submitting to github will trigger the corresponding workflow actions `publish.yml` and `release-tag.yml`.

- `publish.yml` will publish the packages we need to publish to NPM. (need to configure `NPM_TOKEN`)
- `release-tag.yml` will help us create the corresponding Tag version information. (need to configure `ACCESS_TOKEN`)

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
