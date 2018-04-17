<template>
  <section>
    <v-container grid-list-md >
      <v-layout row wrap>
        <v-flex xs12 md4  v-for="especialidad in especialidades" :key="especialidad.id">
          <v-button @click="verEspecialidad(especialidad.id)" >
            <v-card color="white" class="grey--text" >
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs3>
                      <v-card-media
                        src="static/ciclovia.jpg"
                        height="125px"
                        contain
                      ></v-card-media>
                  </v-flex>
                  <v-flex xs9>
                    <div>
                      <div class="headline">{{ especialidad.specialty_name }}</div>
                      <div>{{ especialidad.specialty_description }}</div>
                      <div class="blue--text">4 Cursos</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-button>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { especialidadService } from '@/services/Especialidad.service'

export default {
  data () {
    return {
      especialidades: []
    }
  },
  mounted () {
    let vm = this
    vm.loadEspecialidades()
  },
  methods: {
    loadEspecialidades () {
      let vm = this
      especialidadService.query().then(data => {
        console.log(data.body)
        vm.especialidades = data.body
      })
    },
    verEspecialidad (id) {
      this.$router.push({name: 'showSpecialty', params: {id: id}})
    }
  }
}
</script>

<style scoped>
  
</style>