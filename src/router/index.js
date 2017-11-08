import Vue from 'vue'
import Router from 'vue-router'
import MyApp from '@/components/MyApp'
import Maquinaria from '@/components/Maquinaria'
import LoginComponent from '@/components/Login'
import Credentials from '@/services/Credentials.service.js'

Vue.use(Router)

const credentials = new Credentials()

const router = new Router({
  routes: [
    {
      path: '/',
      component: MyApp,
      children: [
        {
          path: 'maquinaria',
          component: Maquinaria
        }
      ]
    },
    {
      path: '/login',
      component: LoginComponent
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (credentials.isLogin()) {
    if (to.path === '/login') next({path: '/'})
    else next()
    next()
  } else {
    if (to.path === '/login') next()
    else next({path: '/login'})
  }
})

export default router
