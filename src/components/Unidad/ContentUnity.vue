<template>
  <section >

    <v-card flat class="toolbar-misCursos" offset-xs1>
    <v-layout row wrap offset-xs1>
      <v-flex xs6 >
        <h3 class=" pl-5 mt-4">Contenido Unidad</h3>
      </v-flex>
      <v-flex xs3  >
          <v-btn
            color="red darken-4"
            class="white--text mt-4"
          >
            Nueva Prueba
            <v-icon right dark>add</v-icon>
          </v-btn>
      </v-flex>
      <v-flex xs3  >
          <v-btn
            color="red darken-4"
            class="white--text mt-4"
            @click.native.stop="dialogCrearLeccion = true"
          >
            Nueva Leccion
            <v-icon right dark>add</v-icon>
          </v-btn>
      </v-flex>
    </v-layout>
    </v-card>
      <v-layout row wrap >
        <v-flex  class=" mt-3" offset-xs1 xl2 lg2 md2 xs12 sm3 v-for="lesson in lessons" :key="lesson.id">
          <button @click="nuevaLeccion(lesson.id)" >
            <v-card  flat class="leccion-card" color="ed darken-4">
              <v-card-title primary-title class="lesson-titulo">
                <v-layout row wrap>
                  <v-flex xs2>
                    <img class="imagen" src="static/ic_book_white_48dp_2x.png">
                  </v-flex>
                   <v-flex xs10  >
                    <p class="p-leccion headline text-xs-center text--white mb-0">Leccion</p>
                  </v-flex>
                  <v-flex xs12  >
                    <p class="subheading centro-card text-xs-center text--white-center mb-0">{{ lesson.lesson_title }}</p>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </button>
        </v-flex>
      </v-layout>


      <v-dialog v-model="dialogCrearLeccion"  max-width="500px" >
  <v-card>
     <p class="p-toolbar display-1"><strong>NUEVA LECCION</strong></p>

    <v-form  >
      <v-card-text>
        <v-container grid-list-sm>
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
                </v-flex>  
  
          </v-layout>
        </v-container>
        <small>*Campos Obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="red darken-4" dark round @click.native="dialogCrearLeccion = false" >Cancelar</v-btn>
        <v-btn  color="red darken-4" dark round @click="submitLeccion(lesson)" >Agregar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>

  </section>
</template>

<script>
import { leccionService } from '@/services/Leccion.service'
import { getLessonsPerUnity } from '@/services/getLessonsPerUnity.service'
export default {
  data () {
    return {
      id_unidad: 0,
      lessons: {},
      lesson: {},
      dialogCrearLeccion: false
    }
  },
  methods: {
    loadLecciones (id) {
      let vm = this
      getLessonsPerUnity.getById(vm.id_unidad).then(data => {
        console.log(data.body)
        vm.lessons = data.body
      })
    },
    editar () {
      this.editable = false
    },
    submitLeccion (model) {
      let vm = this
      model.unity_id = vm.id_unidad
      console.log(model)
      leccionService.save(model).then(data => {
        vm.lessons = data.body
        console.log(data)
        vm.dialogCrearUnity = false
      }, response => {
      })
    },
    nuevaLeccion (id) {
      this.$router.push({name: 'newLesson', params: {id: id}})
    }
  },
  mounted () {
    let vm = this
    vm.id_unidad = vm.$route.params.id
    console.log('id unidad ' + vm.$route.params.id)
    vm.loadLecciones(vm.id_unidad)
  }
}
</script>

<style scoped>

.header-card{
  background-color: #0d47a1;
  color: white
}

.toolbar-misCursos{
  padding: 0.2em;
  margin: 0.5em;


}

.expansion-panel__header {
  padding: 0px !important;
}

.imagen{
  max-width: 50px;
  max-height: 50px;
  height: 50px;
  width: 50px;
  margin-top: 40px

}

.centro-card {
  background-color: #0277BD;
  color: white;
  min-height: 50px;
  margin-top: 40px;
  padding-top: 10px;
}


.leccion-card {
  background-color: #BF360C;
  height: 250px;
  min-height: 250px;
}

.lesson-titulo {
      padding: 0px;
}

.p-leccion{
  color: white;
   margin-top: 45px;



}

.p-toolbar{
  color: white;
  margin-top: 10px;
  align-items: center;
  text-align: center; 
  padding-top: 10px; 
  background-color: #BF360C;
  padding-bottom: 10px 
}

</style>

