[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![BCH compliance](https://bettercodehub.com/edge/badge/Down-To-Programme/2020-software-engineering-project2-treegen?branch=master)](https://bettercodehub.com/)

# TreeGen

This web application allows you to visualise the fractal-like biological patterns that can be generated using simple Lindenmayer systems.

The live project can be found at https://down-to-programme.github.io/treegen/.

Treegren has been built using the [Vue.js](https://vuejs.org) and [Nuxt.js](https://nuxtjs.org) frameworks and specifically took advantage of functionality from [vue-p5](https://github.com/Kinrany/vue-p5). The project is hosted using [Github Pages](https://pages.github.com).

# Development guidluines

## Build a Development Environment

A development environement can be generated in the following way.

Install dependencies

```bash
$ npm install
```

Serve with hot reload at localhost:3000

```bash
$ npm run dev
```

Build for production and launch server

```bash
$ npm run build
$ npm run start
```

Generate static project

```bash
$ npm run generate
```

NB: Occasionally vue-p5 does not install correctly and needs to be innsrtalled separately, via runnin the following command.

```bash
npm install --save vue vue-p5
```

## Project Structure

The project structure is largely based on the default [Vue.js](https://vuejs.org) and [Nuxt.js](https://nuxtjs.org) frameworks structure.

Currently there exist three main pages: index, about, links. The drawing functionality on the index page is managed by the DrawingBoard.Vue component, which communicates with the page through props and refs.

Testing is managed using Vue Test Utils and tests live in the test directory.

## Pull Requests and Issues

Pull requests are always welcome, and DownToProgramme appreciates any help you give. Please ensure that all tests are passing to speed the process of merges being approved.

Please feel free to [open a new issue](https://github.com/Down-To-Programme/treegen/issues) for any reason.
