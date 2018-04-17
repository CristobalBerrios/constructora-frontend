<template>
  <section >
    <v-layout row wrap>
    <v-flex xs10 sm10 md10 offset-xs1 >
     <form>
      <v-card class="pl-4 mt-3">
        <h5  class="text--white pt-3 pb-2" >Informacion Basica Curso</h5>
        <v-btn  color="primary" @click="goUnidad()">
          Nueva Unidad
        </v-btn>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
          <v-flex xs12 >
            <v-text-field
            label="Titulo"
            v-model="curso.title"
            :counter="50"
            required
            :disabled = "editable"
            ></v-text-field>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                name="input-3-1"  
                label="Descripción breve"
                multi-line
                v-model="curso.description"
                rows=3
                :disabled = "editable"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                name="input-7-1"
                label="Acerca del curso"
                item-text="curso.about"
                item-value="id"
                multi-line
                v-model="curso.about"
                rows=3
                :disabled = "editable"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-divider ></v-divider>
          <v-flex xs12 sm12 md6>
            <v-select
            label="Nivel"
            v-model="curso.level_id"
            :items="levels"
            item-text="level_name"
            item-value="id"
            required
            :disabled = "editable"
            ></v-select>
          </v-flex>


           <v-flex xs12 sm12 md6>
             <v-select
             label="Especialidad"
             v-model="curso.specialty"
             :items="specialty"
             item-text="specialty_name"
             item-value="id"
             required
             :disabled = "editable"
             ></v-select>
           </v-flex>

            <v-flex xs12 sm12 md12>
            <v-btn v-if="editable" class="primary mb-4" @click="editar()">Editar Curso</v-btn>
            <v-btn v-if="!editable" class="primary mb-4" @click="editar()">Guardar</v-btn>
          </v-flex>
    </v-layout>
  </v-container>
</v-card>
</form>
</v-flex>


</v-layout>
  </section>
</template>

<script>
import { courceService } from '@/services/Cource.service'
import { nivelService } from '@/services/Nivel.service'
import { especialidadService } from '@/services/Especialidad.service'
export default {
  data () {
    return {
      idCurso: 0,
      curso: {},
      levels: [],
      editable: true,
      specialty: [],
      unidades: {},
      unidad: {},
      lecciones: [],
      pagination: {},
      title: '',
      valid: true,
      dialogCrearUnity: false,
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Unidad', value: 'unidad' },
        { text: 'Editar', value: 'editar' }
      ]
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
    loadNiveles () {
      let vm = this
      nivelService.query().then(data => {
        console.log(data.body)
        vm.levels = data.body
      })
    },
    loadEspecialidad () {
      let vm = this
      especialidadService.query().then(data => {
        console.log(data.body)
        vm.specialty = data.body
      })
    },
    editar () {
      this.editable = false
    },
    goUnidad () {
      this.$router.push({name: 'newUnity', params: {id: this.idCurso}})
    }
  },
  mounted () {
    let vm = this
    vm.idCurso = vm.$route.params.id
    console.log('id curso ' + vm.$route.params.id)
    vm.loadCurso()
    vm.loadNiveles()
    vm.loadEspecialidad()
  }
}
</script>

<style scoped>
</style>

