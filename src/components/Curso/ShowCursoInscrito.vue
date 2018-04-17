<template>
  <section>
    <v-container grid-list-md >
      <v-layout row wrap>
        <v-flex xs12 sm4 v-for="curso in cursos" :key="curso.id">
          <v-button @click="verCurso(curso.id)" >
            <v-card>
              <v-card-media
                class="white--text"
                height="150px"
                src="static/v.png"
                contain
                :style="'background-color: #'+ curso.cource_color "
              >
                <v-container fill-height fluid  grid-list-lg >
                  <v-layout fill-height >
                    <v-flex xs12 align-end flexbox >
                      <span class="headline" > </span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ curso.cource_title }}</h3>
                  <span class="grey--text">{{ curso.cource_description }}</span><br>
                </div>
              </v-card-title>
              <v-card-actions>
                <div>
                  <span>Nivel: </span><span class="grey--text">{{ curso.level.level_name }}</span><br>
                  <span></span>
                </div>
              </v-card-actions>
            </v-card>
          </v-button>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { getEnrollUserInCurseService } from '@/services/GetEnrollUserInCurse.service'
export default {
  data () {
    return {
      idEspecialidad: 0,
      cursos: []
    }
  },
  mounted () {
    let vm = this
    vm.loadCursos()
  },
  methods: {
    loadCursos () {
      let vm = this
      getEnrollUserInCurseService.query().then(data => {
        console.log(data.body)
        vm.cursos = data.body
      })
    },
    verCurso (id) {
      this.$router.push({name: 'showCource', params: {id: id}})
    }
  }
}
</script>

<style scoped>


</style>