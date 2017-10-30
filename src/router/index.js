import Vue from 'vue'
import Router from 'vue-router'
import MyApp from '@/components/MyApp'
import LoginComponent from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: MyApp
    },
    {
      path: '/login',
      component: LoginComponent
    }
  ]
})

router.beforeEach((to, from, next) => {
  var login = true
  console.log(to.path)
  if (login || to.path === '/login') {
    next()
  } else {
    next({path: '/login'})
  }
})

export default router
