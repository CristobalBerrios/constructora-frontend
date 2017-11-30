import Vue from 'vue'
import Router from 'vue-router'
import MyApp from '@/components/MyApp'
import Obra from '@/components/Obra'
import Presupuestos from '@/components/Presupuestos'
import ShowPresupuesto from '@/components/ShowPresupuesto'
import Maquinaria from '@/components/Maquinaria'
import Consultas from '@/components/Consultas'
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
          name: 'maquinarias',
          path: 'maquinarias',
          component: Maquinaria
        },
        {
          name: 'obras',
          path: 'obras',
          component: Obra
        },
        {
          name: 'presupuestos',
          path: 'obras/:id/presupuestos',
          component: Presupuestos
        },
        {
          name: 'showPresupuesto',
          path: '/presupuesto/:id',
          component: ShowPresupuesto
        },
        {
          name: 'consultas',
          path: 'consultas',
          component: Consultas
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
