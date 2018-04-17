<template>
  <section >
      <v-layout row wrap :style="'background-color: #'+ curso.cource_color ">
        <v-flex class="mt-4 pl-5 pb-5"  xs12 sm8 md8>
          <span class="white--text">CURSO ONLINE</span>
          <h4 xs12 class="white--text ">{{ curso.cource_title }}</h4>
          <h5 class="white--text headline">{{ curso.cource_description }}</h5>
          <span class="white--text">INDUCCION</span><br>
          <v-btn v-if="inscrito" class="mt-4" color="primary" @click="enrollUsersInProgress(curso.id)">COMENZAR CURSO</v-btn>
        </v-flex>
        <v-flex d-flex xs12 sm4 md4>
          <v-flex
            xs12
            sm6
            md8
            text-xs-center
            layout
            align-center
            justify-center
          >
            <img src="/static/v.png" alt="avatar">
          </v-flex>
        </v-flex>
      </v-layout>
      <br><br><br>
      <v-flex  xs12 sm6 md8 pl-5>
          <span class="white--gray">ACERCA DE ESTE CURSO</span><br><br>
          <span class="white--black">{{ curso.cource_about }}</span>
          <br><br>
          <v-divider></v-divider>
          <br><br>
          <h4 class="text-xs-center">LECCIONES</h4>
          <v-card class="pl-4 pt-4 pr-4">
            <p class="text-xs-center">Avance</p>
            <div >
              <v-progress-linear value="75" height="20" color="orange"></v-progress-linear>
            </div>
            <v-card-actions>
              <v-layout row>
                <v-flex xs12 sm12 >
                  <v-flex xs12 sm12 v-for="unidad in curso.units"  :key="unidad.id">
                    <p>Unidad {{ unidad.unity_orden }}</p>
                    <h5><strong>{{ unidad.unity_name }}</strong></h5>
                    <v-layout row>
                      <v-flex xs12 sm12 >
                          <v-list>
                            <v-list-tile v-for="lesson in unidad.lessons" v-bind:key="lesson.id" @click="verLeccion(lesson.id)" >
                              <v-list-tile-content>
                                <v-list-tile-title >{{ lesson.lesson_title }}</v-list-tile-title>
                              </v-list-tile-content>
                              <v-list-tile-avatar>
                                Iniciar 
                                <v-icon v-if="" color="green">check</v-icon>
                              </v-list-tile-avatar>
                            </v-list-tile>
                          </v-list>
                      </v-flex>
                    </v-layout>
                    <v-divider class="mb-5"></v-divider>
                  </v-flex> 
                </v-flex>
              </v-layout> 
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
        </v-flex>
  </section>
</template>

<script>
import { courceService } from '@/services/Cource.service'
import { enrollUsersInProgressService } from '@/services/EnrollUsersInProgress.service'
export default {
  data () {
    return {
      idCurso: 0,
      curso: {},
      unidades: {},
      lecciones: [],
      request: {},
      inscrito: true
    }
  },
  methods: {
    loadCurso () {
      let vm = this
      courceService.getById(vm.idCurso).then(data => {
        console.log(data.body)
        vm.curso = data.body
        vm.unidades = data.body.units
        console.log(vm.unidades)
        vm.lecciones = data.body.units.lessons
      })
    },
    verLeccion (id) {
      this.$router.push({name: 'showLesson', params: {id: id}})
    },
    enrollUsersInProgress (id) {
      let vm = this
      vm.request.id_curso = id
      console.log(vm.request)
      enrollUsersInProgressService.save(vm.request).then(data => {
        console.log(data.body)
        vm.inscrito = data.body
      }, response => {
        vm.loadingCurso = false
      })
    }
  },
  mounted () {
    let vm = this
    vm.idCurso = vm.$route.params.id
    console.log('id curso ' + vm.$route.params.id)
    vm.loadCurso()
  }
}
</script>

<style scoped>
</style>

