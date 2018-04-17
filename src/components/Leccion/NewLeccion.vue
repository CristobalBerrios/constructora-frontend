<template>
  <section >
    <v-layout row wrap>
    <v-flex xs10 sm10 md8 offset-xs2 >
     <form>
      <v-card class="pl-4 mt-3">
        <h5 class="text--white pt-3 pb-2" >Formulario Para Crear Una Leccion</h5>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
          <v-flex xs12 >
            <v-text-field
              label="Titulo Para la Leccion"
              v-model="lesson.lesson_title"
              :counter="50"
              required
            ></v-text-field>
                <v-text-field
                name="input-3-1"  
                label="Descripción breve"
                multi-line
                v-model="lesson.lesson_about"
                rows=3
                ></v-text-field>
                <v-text-field
                name="input-7-1"
                label="Acerca de la Leccion"
                multi-line
                v-model="lesson.lesson_text"
                rows=3
                ></v-text-field>
            <v-text-field
            label="Agrege la URL del Video"
            v-model="lesson.lesson_video"
            required
            ></v-text-field>
             <v-btn class="primary mb-4" @click="submitLesson(lesson)">Crear Curso</v-btn>
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
import { unidadService } from '@/services/Unidad.service'
import { leccionService } from '@/services/Leccion.service'
export default {
  data () {
    return {
      idUnidad: 0,
      editable: true,
      unidad: {},
      lesson: {},
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
    loadUnidad () {
      let vm = this
      unidadService.getById(vm.idUnidad).then(data => {
        console.log(data.body)
        vm.unidad = data.body
      })
    },
    submitLesson (model) {
      let vm = this
      model.unity_id = vm.idUnidad
      console.log(model)
      leccionService.save(model).then(data => {
        console.log(data)
        this.$router.push('cursesCreated')
      }, response => {
        vm.showSnack('Error al crear la leccion')
      })
    }
  },
  mounted () {
    let vm = this
    vm.idUnidad = vm.$route.params.id
    console.log('id unidad' + vm.$route.params.id)
  }
}
</script>

<style scoped>
</style>

