  <template>
  <section >
      <v-expansion-panel class="mt-2 ml-2 ">
          <v-expansion-panel-content class="">
              <div class="" slot="header"><h5 class="style-p pl-1 mt-1 ">DATOS BASICOS DEL CURSO</h5></div>
                <v-card>
                    <v-card-text class="grey lighten-3"> 
                      <v-layout row wrap offset-xs1>
                <v-flex xs4  >
                   <p class="style-p pl-3"><strong>Nombre Curso: </strong> {{ lesson.unity.course.cource_title }}</p>
                </v-flex>
                 <v-flex xs4  >
                   <p class="style-p pl-3"> <strong>Autor: </strong> {{ lesson.autor.name }}</p>
                </v-flex>
                 <v-flex xs4  >
                   <p class="style-p pl-3"><strong>Cantidad de Unidades: </strong> {{ cantidadUnidades }}</p>
                </v-flex>
                 </v-layout>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
     </v-expansion-panel> 

     <v-layout row wrap>
    <v-flex xs12 sm12 md9 offset-xs1 >
         <v-layout row wrap>
          <v-flex xs10 sm10 md10  >
 
            <v-flex xs12 class="panelDerechaLeccion">
        <div>
          <v-tabs v-model="active2" scrollable>
            <v-tabs-bar class="primary" >
              <v-tabs-item
                v-for="tab in tabs"
                :key="tab"
                :href="'#' + tab"
                ripple
                 class="tab-leccion-derecha"
              >
                  <p class="estilo-p">{{ tab }}</p>
              </v-tabs-item>
              <v-tabs-slider color="red"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-items>
              <v-tabs-content
                v-for="tab in tabs"
                :key="tab"
                :id="tab"
              >
                <v-card flat>

                  <!-- Pestaña de LEccion -->

                  <v-flex class="ml-0 "  v-if="tab === 'Leccion'">
                                <form>
            <v-card class="pl-4 mt-3">
              <v-container fluid grid-list-md>
                <v-layout row wrap>
                <v-flex xs6 >
                  <v-text-field
                    label="Titulo "
                    v-model="lesson.lesson_title"
                    :counter="50"
                    required
                    :disabled = 'editable'
                  ></v-text-field>
                  </v-flex>
                                         <v-flex xs6 >
                  <v-text-field
                  label="Video"
                  v-model="lesson.lesson_video"
                  required
                  :disabled = 'editable'
                  ></v-text-field>
                  </v-flex>
                  <v-flex xs6 >
                      <v-text-field
                      name="input-3-1"  
                      label="Descripción breve"
                      multi-line
                      v-model="lesson.lesson_about"
                      rows=3
                      :disabled = 'editable'
                      ></v-text-field>
                       </v-flex>
                      <v-text-field
                      name="input-7-1"
                      label="Acerca de la Leccion"
                      multi-line
                      v-model="lesson.lesson_text"
                      rows=3
                      :disabled = 'editable'
                      ></v-text-field>
                

                  <v-flex xs12 >
                   <v-btn v-if ="editable" class="primary mb-4" @click="cambiarEditable()">Editar Leccion</v-btn>
                     <v-btn v-if ="!editable" class="primary mb-4" @click="editLesson(lesson)">guardar</v-btn>
                </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      </form>
                  </v-flex>

                  <!-- Pestaña de Archivos -->
                  <v-flex class="ml-0 "  v-if="tab === 'Archivos'">
                    <v-list two-line subheader>
                      <v-list-tile v-for="item in archivos" v-bind:key="item.title" avatar @click="">
                        <v-list-tile-avatar>
                          <v-icon class="red white--text">assignment</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn icon ripple @click="deleteArchivo(item.id)">
                            <v-icon color="grey lighten-1">gavel</v-icon>
                          </v-btn>
             <!--              <a class="enlace" :href="'http://localhost:8000/api/getArchiveslessons/' + item.url">
                             <v-btn icon ripple @click="descargarArchivo(item.url)">
                            <v-icon color="grey lighten-1">info</v-icon>
                          </v-btn>
                          </a> -->
  
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>

                  <!-- Pestaña de links -->
                  <v-flex class="ml-0 "  v-if="tab === 'Links'">
                    <v-list>
                      <template v-for="item in links">
                      <v-list-tile avatar  >
                        <v-list-tile-content>
                           <a class="enlace" :href=" item.url " target="_blank">
                             <v-btn  flat >{{ item.nombre }}</v-btn>
                          </a>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn icon ripple @click="deleteLink(item.id)">
                            <v-icon color="grey lighten-1">gavel</v-icon>
                          </v-btn>
  
                        </v-list-tile-action>
                      </v-list-tile>
                      </template>
                    </v-list>

                  </v-flex>

                  <!-- Pestaña de competencias -->

                  <v-flex class="ml-0 "  v-if="tab === 'Competencias'">
                    <v-list three-line>
                      <template v-for="item in competiciones">
                      <v-list-tile avatar  >
                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.competition_title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.competition_description"></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn icon ripple @click="deleteCompetencia(item.id)">
                            <v-icon color="grey lighten-1">gavel</v-icon>
                          </v-btn>
  
                        </v-list-tile-action>
                      </v-list-tile>
                      </template>
                    </v-list>

                  </v-flex>

                  <!-- Pestaña de objetivos -->


                  <v-flex class="ml-0 "  v-if="tab === 'R.Aprendizaje'">
                    <v-list three-line>
                      <template v-for="item in objetivos">
                      <v-list-tile avatar  >
                        <v-list-tile-content>
                          <v-list-tile-sub-title v-html="item.objetive_description"></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn icon ripple @click="deleteObjetivo(item.id)">
                            <v-icon color="grey lighten-1">gavel</v-icon>
                          </v-btn>
  
                        </v-list-tile-action>
                      </v-list-tile>
                      </template>
                    </v-list>

                  </v-flex>
                </v-card>
              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>
        </div>
      </v-flex>
      </v-flex>



        <v-flex xs3 sm12 md2  >
          <v-flex xs8 sm8 md8  offset-xs4 >
            <v-btn
            color="indigo darken-3"
            class="white--text mt-4 boton-derecha"
             @click.native.stop="dialogAddArchivo = true"
          >
            Archivo
            <v-icon right dark>add</v-icon>
          </v-btn>
          </v-flex>
          <v-flex xs8 sm8 md8  offset-xs4 >
            <v-btn
            color="purple darken-4"
            class="white--text mt-4 boton-derecha"
             @click.native.stop="dialogAddLinks = true"
          >
            Link
            <v-icon right dark>add</v-icon>
          </v-btn>
          </v-flex>
          <v-flex xs8 sm8 md8  offset-xs4 >
            <v-btn
            color="light-green darken-4"
            class="white--text mt-4 boton-derecha"
             @click.native.stop="dialogAddCompetencias = true"
          >
            Competencia  
            <v-icon right dark>add</v-icon>
          </v-btn>
          </v-flex>
          <v-flex xs8 sm8 md8  offset-xs4 >
            <v-btn
            color="orange darken-4"
            class="white--text mt-4 boton-derecha"
             @click.native.stop="dialogAddObjetivos = true"
          >
            R. Aprendizaje  
            <v-icon right dark>add</v-icon>
          </v-btn>
          </v-flex>
      
        </v-flex>

      </v-layout>
    </v-flex>
    </v-layout>



    <v-dialog v-model="dialogAddArchivo"  max-width="500px" >
  <v-card>
    <v-toolbar flat dark color="indigo darken-3">
      <v-toolbar-title class="white--text center">Agregar Archivo</v-toolbar-title>
    </v-toolbar>
    <v-form  >
      <v-card-text>
        <v-container grid-list-sm>
          <v-layout row wrap>
          <v-flex xs12 >
            <v-flex xs12>
              <v-card>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-flex xs12>
                        <v-text-field
                          name="input-1"
                          label="Nombre"
                          v-model="archivo.nombre"
                        ></v-text-field>
                      </v-flex>
                      <v-layout >
                      <v-flex xs1>
                        <v-icon>attach_file</v-icon>
                      </v-flex>
                      <v-flex xs11>
                      <v-select
                        :items="states"
                        v-model="archivo.tipo"
                        item-text="nombre"
                        item-value="id"
                        required
                        label="Tipo"
                        autocomplete
                      ></v-select>
                    </v-flex>
                    </v-layout>
                    <v-layout >
                      <v-flex xs1>
                        <v-icon>attach_file</v-icon>
                      </v-flex>
                      <v-flex xs11>
                        <input type="file" accept="image/*;capture=camera" @change="procesarArchivo($event)">
                      </v-flex>

                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-flex>


          </v-flex>  
  
          </v-layout>
        </v-container>
        <small>*Campos Obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="indigo darken-3" flat @click.native="dialogAddArchivo = false" >Cancelar</v-btn>
        <v-btn  color="indigo darken-3" flat @click="submitArchivo(archivo)" >Agregar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>



    <v-dialog v-model="dialogAddLinks"  max-width="500px" >
  <v-card>
    <v-toolbar flat dark color="purple darken-4">
      <v-toolbar-title class="white--text center">Agregar Links</v-toolbar-title>
    </v-toolbar>
    <v-form  >
      <v-card-text>
        <v-container grid-list-sm>
                <v-layout row wrap>
                <v-flex xs12 >
                     <v-card>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-flex xs12>
                        <v-text-field
                          name="input-1"
                          label="Nombre"
                          v-model="link.nombre"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          name="input-1"
                          label="Enlace"
                          v-model="link.url"
                        ></v-text-field>
                      </v-flex>
    
                  </v-container>
                </v-card-text>
              </v-card>

                </v-flex>  
  
          </v-layout>
        </v-container>
        <small>*Campos Obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="purple darken-4" flat @click.native="dialogAddLinks = false" >Cancelar</v-btn>
        <v-btn  color="purple darken-4" flat @click="submitLink(link)" >Agregar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>




    <v-dialog v-model="dialogAddCompetencias"  max-width="500px" >
  <v-card>
    <v-toolbar flat dark color="light-green darken-4">
      <v-toolbar-title class="white--text center">Agregar Competencia a Desarrollar</v-toolbar-title>
    </v-toolbar>
    <v-form  >
      <v-card-text>
        <v-container grid-list-sm>
                <v-layout row wrap>
                <v-flex xs12 >

                <v-text-field
                          name="input-1"
                          label="Titulo"
                          v-model="competicion.competition_title"
                          required
                        ></v-text-field>

                </v-flex> 
                       <v-flex xs12 >

                <v-text-field
                          name="input-1"
                          label="Descripcion"
                           multi-line
                           required
                          v-model="competicion.competition_description"
                        ></v-text-field>

                </v-flex>   

                 <v-layout >

                      <v-flex xs12>
                      <v-select
                        :items="typeCompetetences"
                        v-model="competicion.type_competence_id"
                        item-text="competence_name"
                        item-value="id"
                        required
                        label="Tipo de Competencia"
                        autocomplete
                      ></v-select>
                    </v-flex>
                    </v-layout>
  
          </v-layout>
        </v-container>
        <small>*Campos Obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="light-green darken-4" flat @click.native="dialogAddCompetencias = false" >Cancelar</v-btn>
        <v-btn  color="light-green darken-4" flat @click="submitCompeticion(competicion)" >Agregar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>

    <v-dialog v-model="dialogAddObjetivos"  max-width="500px" >
  <v-card>
    <v-toolbar flat dark color="orange darken-4">
      <v-toolbar-title class="white--text center">Agregar Objetivos</v-toolbar-title>
    </v-toolbar>
    <v-form  >
      <v-card-text>
        <v-container grid-list-sm>
                <v-layout row wrap>
                <v-flex xs12 >
  
<v-text-field
                          name="input-1"
                          label="Descripcion"
                           multi-line
                           required
                          v-model="objetivo.objetive_description"
                        ></v-text-field>

                </v-flex>   

                </v-flex>  
  
          </v-layout>
        </v-container>
        <small>*Campos Obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="orange darken-4" flat @click.native="dialogAddObjetivos = false" >Cancelar</v-btn>
        <v-btn  color="orange darken-4" flat @click="submitObvective(objetivo)" >Agregar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>

 <v-snackbar
      :timeout="timeout"
      :color="colorSnackbar"
      v-model="snackbar"
    >
    <v-icon dark>check_circle</v-icon>
      {{ textSnackbar }}
      <v-btn dark flat @click.native="snackbar = false">X</v-btn>
    </v-snackbar>

   
  </section>
</template>

<script>
import { leccionService } from '@/services/Leccion.service'
import { fileTypesService } from '@/services/FileTypes.service'
import { archiveService } from '@/services/Archive.service'
import { getArchivoLessonService } from '@/services/GetArchivoLesson.service'
import { linkService } from '@/services/Link.service'
import { competitionService } from '@/services/Competition.service'
import { objetiveService } from '@/services/Objetive.service'
import { typeCompetitionService } from '@/services/TypeCompetition.service'
export default {
  data () {
    return {
      idLeccion: 0,
      editable: true,
      unidad: {},
      lesson: {},
      curso: {},
      pagination: {},
      title: '',
      valid: true,
      links: [],
      link: {},
      competicion: {},
      objetivo: {},
      objetivos: [],
      dialogCrearUnity: false,
      dialogAddArchivo: false,
      dialogAddLinks: false,
      dialogAddCompetencias: false,
      dialogAddObjetivos: false,
      archivo: {},
      states: [],
      typeCompetetences: [],
      competiciones: [],
      archivos: [],
      tabs: ['Leccion', 'Archivos', 'Links', 'Competencias', 'R.Aprendizaje'],
      active2: null,
      cantidadUnidades: 0,
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Unidad', value: 'unidad' },
        { text: 'Editar', value: 'editar' }
      ],
      snackbar: false,
      colorSnackbar: '',
      timeout: 6000,
      textSnackbar: ''
    }
  },
  methods: {
    loadLeccion () {
      let vm = this
      leccionService.getById(vm.idLeccion).then(data => {
        console.log(data.body)
        vm.lesson = data.body
        vm.archivos = data.body.archives
        vm.links = data.body.links
        vm.competiciones = data.body.competences
        vm.objetivos = data.body.objectives
        vm.cantidadUnidades = data.body.unity.length
      })
    },
    loadTipoArchivo () {
      let vm = this
      fileTypesService.query().then(data => {
        vm.states = data.body
        console.log(vm.states)
      })
    },
    loadTipoCompetencia () {
      let vm = this
      typeCompetitionService.query().then(data => {
        vm.typeCompetetences = data.body
        console.log(vm.typeCompetetences)
      })
    },
    submitArchivo (model) {
      let vm = this
      console.log(model)
      var formData = new FormData()
      formData.append('file', vm.archivo.file)
      formData.append('nombre', model.nombre)
      formData.append('tipo_archivo_id', model.tipo)
      formData.append('lesson_id', vm.idLeccion)
      console.log(formData)
      archiveService.save(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => {
        console.log(data)
        vm.dialogAddArchivo = false
        vm.mensajeToast('success', true, 'Archivo guardado con exito')
        vm.archivos = data.body
      // this.$router.push({name: 'editCource', params: {id: data.body.id}})
      }, response => {
      })
    },
    editLesson (model) {
      let vm = this
      console.log(model)
      leccionService.update(vm.idLeccion, model).then(data => {
        console.log(data)
        vm.mensajeToast('success', true, 'Leccion  guardada con exito')
        vm.editable = true
      }, response => {

      })
    },
    submitLink (model) {
      let vm = this
      model.lesson_id = vm.idLeccion
      console.log(model)
      linkService.save(model).then(data => {
        console.log(data)
        vm.mensajeToast('success', true, 'Link guardado con exito')
        vm.links = data.body
        vm.dialogAddLinks = false
      }, response => {
        vm.showSnack('Error al crear el link')
      })
    },
    submitCompeticion (model) {
      let vm = this
      model.lesson_id = vm.idLeccion
      console.log(model)
      competitionService.save(model).then(data => {
        console.log(data)
        vm.mensajeToast('success', true, 'Competicion guardado con exito')
        vm.competiciones = data.body
        vm.typeCompetetences = false
      }, response => {
        vm.showSnack('Error al crear el link')
      })
    },
    submitObvective (model) {
      let vm = this
      model.lesson_id = vm.idLeccion
      console.log(model)
      objetiveService.save(model).then(data => {
        console.log(data)
        vm.objetivos = data.body
        vm.mensajeToast('success', true, 'Resultado de aprendizaje guardado con exito')
        vm.dialogAddObjetivos = false
      }, response => {
        vm.showSnack('Error al crear el Objetivo')
      })
    },
    procesarArchivo (event) {
      var vm = this
      vm.archivo.file = event.target.files[0]
    },
    descargarArchivo (ruta) {
      console.log(ruta)
      getArchivoLessonService.getById(ruta).then(data => {
        console.log(data)
      })
    },
    deleteArchivo (id) {
      let vm = this
      archiveService.destroy(id).then(data => {
        console.log(data.body)
        vm.archivos = data.body
      }, response => {
        console.log('error')
      })
    },
    deleteLink (id) {
      let vm = this
      console.log(id)
      linkService.destroy(id).then(data => {
        console.log(data.body)
        vm.links = data.body
      }, response => {
        console.log('error')
      })
    },
    deleteCompetencia (id) {
      let vm = this
      console.log(id)
      competitionService.destroy(id).then(data => {
        console.log(data.body)
        vm.competiciones = data.body
      }, response => {
        console.log('error')
      })
    },
    deleteObjetivo (id) {
      let vm = this
      console.log(id)
      objetiveService.destroy(id).then(data => {
        console.log(data.body)
        vm.objetivos = data.body
      }, response => {
        console.log('error')
      })
    },
    cambiarEditable () {
      this.editable = false
    },
    mensajeToast (color, snack, texto) {
      let vm = this
      vm.colorSnackbar = color
      vm.snackbar = snack
      vm.textSnackbar = texto
    }
  },
  mounted () {
    let vm = this
    vm.idLeccion = vm.$route.params.id
    console.log('id unidad' + vm.$route.params.id)
    vm.loadTipoArchivo()
    vm.loadLeccion()
    vm.loadTipoCompetencia()
  }
}
</script>

<style scoped>

.panelDerechaLeccion{
  background-color: white;
  min-height: 500px;
  margin-top: 10px
}

.boton-derecha {
  width: 200px
}


.enlace{
  text-decoration:none;
}

.estilo-p {
  color: white;
  margin-bottom: 0px
}
</style>

