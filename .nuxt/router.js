import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4d681778 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _77fe0a8a = () => interopDefault(import('../pages/about 2.vue' /* webpackChunkName: "pages/about 2" */))
const _25184f85 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _3d7c4da4 = () => interopDefault(import('../pages/links.vue' /* webpackChunkName: "pages/links" */))
const _98453494 = () => interopDefault(import('../pages/links 2.vue' /* webpackChunkName: "pages/links 2" */))
const _6d1ff23d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/Down-To-Programme/treegen/pages/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _4d681778,
    name: "about"
  }, {
    path: "/about 2",
    component: _77fe0a8a,
    name: "about 2"
  }, {
    path: "/inspire",
    component: _25184f85,
    name: "inspire"
  }, {
    path: "/links",
    component: _3d7c4da4,
    name: "links"
  }, {
    path: "/links 2",
    component: _98453494,
    name: "links 2"
  }, {
    path: "/",
    component: _6d1ff23d,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
