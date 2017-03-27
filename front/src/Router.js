import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './auth'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: require('./components/Home.vue')},

  {path: '/me', component: require('./components/Me.vue'),beforeEnter: checkAuth},

  {path: '/commits', component: require('./components/Commits.vue'),beforeEnter: checkAuth},
  {path: '/issues', component: require('./components/Issues.vue'),beforeEnter: checkAuth},

  {path: '/stars', component: require('./components/Stars.vue'),beforeEnter: checkAuth},

  {path: '/repos', component: require('./components/Repos.vue'),beforeEnter: checkAuth},
  {path: '/repos/:owner/:name', component: require('./components/Repo.vue'),beforeEnter: checkAuth},
  {path: '/repos/:owner/:name/issues', component: require('./components/Issues.vue'),beforeEnter: checkAuth},
  {path: '/repos/:owner/:name/commits', component: require('./components/Commits.vue'),beforeEnter: checkAuth}
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router

function checkAuth(to, from, next) {
	if (!auth.authenticated) {
		next('/')
	} else {
		next()
	}
}

function checkNotAuth(to, from, next) {
	if (!auth.authenticated) {
    next()
	} else {
    next('/')
	}
}
