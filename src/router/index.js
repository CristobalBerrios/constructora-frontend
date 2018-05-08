import Vue from 'vue'
import Router from 'vue-router'
import MyApp from '@/components/MyApp'
import LoginComponent from '@/components/Login'
import Credentials from '@/services/Credentials.service.js'
import New from '@/components/Curso/New'
import ShowEspecialidad from '@/components/Especialidad/ShowEspecialidad'
import ShowAll from '@/components/Especialidad/ShowAll'
import ShowCurso from '@/components/Curso/ShowCurso'
import ShowLeccion from '@/components/Leccion/ShowLeccion'
import EditCource from '@/components/Curso/EditCurso'
import NewUnidad from '@/components/Unidad/NewUnidad'
import NewLeccion from '@/components/Leccion/NewLeccion'
import CurseInscrito from '@/components/Curso/ShowCursoInscrito'
import CuerseCreados from '@/components/Curso/ShowCursosCreados'
import NuevaLicencia from '@/components/Licencia/newLicence'
import NuevoUsuario from '@/components/Usuario/newUsuario'
import EditarUsuario from '@/components/Usuario/EditUsuario'
import UnidadesPorCurso from '@/components/Unidad/UnidadPerCurso'
import ContentUnity from '@/components/Unidad/ContentUnity'

Vue.use(Router)

const credentials = new Credentials()

const router = new Router({
  routes: [
    {
      path: '/',
      component: MyApp,
      children: [
        {
          name: 'newCource',
          path: 'newCource',
          component: New
        },
        {
          name: 'showSpecialty',
          path: 'showSpecialty/:id',
          component: ShowEspecialidad
        },
        {
          name: 'showAllSpecialty',
          path: 'showAllSpecialty',
          component: ShowAll
        },
        {
          name: 'showCource',
          path: 'showCource/:id',
          component: ShowCurso
        },
        {
          name: 'showLesson',
          path: 'showLesson/:id',
          component: ShowLeccion
        },
        {
          name: 'editCource',
          path: 'editCource/:id',
          component: EditCource
        },
        {
          name: 'newUnity',
          path: 'newUnity/:id',
          component: NewUnidad
        },
        {
          name: 'newLesson',
          path: 'newLesson/:id',
          component: NewLeccion
        },
        {
          name: 'curseInscrito',
          path: 'curseInscrito',
          component: CurseInscrito
        },
        {
          name: 'cursesCreated',
          path: 'cursesCreated',
          component: CuerseCreados
        },
        {
          name: 'newLicence',
          path: 'newLicence',
          component: NuevaLicencia
        },
        {
          name: 'editUser',
          path: 'editUser',
          component: EditarUsuario
        },
        {
          name: 'Unidades',
          path: 'Unidades/id',
          component: UnidadesPorCurso
        },
        {
          name: 'contentUnity',
          path: 'contentUnity/id',
          component: ContentUnity
        }
      ]
    },
    {
      path: '/login',
      component: LoginComponent
    },
    {
      path: '/newUser',
      component: NuevoUsuario
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (credentials.isLogin()) {
    if (to.path === '/login' || to.path === '/newUser') next({path: '/'})
    else next()
    next()
  } else if (to.path === '/newUser') {
    if (to.path === '/newUser') next()
    else next({path: '/newUser'})
  } else {
    if (to.path === '/login' || to.path === '/newUser') next()
    else next({path: '/login'})
  }
})

export default router
