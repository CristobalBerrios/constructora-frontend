<template>
 <v-container grid-list-xl text-xs-center>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
     <form>
      <v-card>
        <h5 class="text--white pt-3 pb-2" style="background-color: blue; color:white">Informacion Basica Curso</h5>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex  xs12 sm12 md3>
              <v-flex xs12>
               <v-card  color="blue-grey darken-2" class="white--text mt-1">
                <v-card-title>
                  <div>
                    <div class="mb-5">*Este formulario ingresa la informacion basica de un curso, una vez guardado estos datos debe crear y enumerar las unidades para el curso, lo cual posteriormente nos dara paso para crear las lecciones que se incorporaran a las unidades</div>
                    <v-icon color="white">thumb_up</v-icon>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-flex>
          <v-flex xs12 sm12 md5>
            <v-subheader class="mt-1 mb-2">Haz clic en "Crear curso" para guardar la informacion.</v-subheader>
            <p>Informacion Basica del curso</p>
            <v-divider ></v-divider>
            <v-text-field
            label="Titulo"
            v-model="curso.title"
            :counter="50"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            required
            ></v-text-field>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                name="input-3-1"  
                label="Descripción breve"
                multi-line
                v-model="curso.description"
                rows=3
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                name="input-7-1"
                label="Acerca del curso"
                multi-line
                v-model="curso.about"
                rows=3
                ></v-text-field>
              </v-flex>
            </v-layout>



          </v-flex>
          <v-flex xs12 sm12 md4 >
           <v-flex xs12 sm12 md12>
            <v-btn class="primary mb-4" @click="submitCurso(curso)">Crear Curso</v-btn>

          </v-flex>
          <v-divider ></v-divider>
          <v-flex xs12 sm12 md12>
            <v-select
            label="Nivel"
            v-model="curso.level_id"
            :items="levels"
            item-text="level_name"
            item-value="id"
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
            required
            ></v-select>
          </v-flex>

          <v-layout row wrap>
           <v-flex xs9 sm9 md9>
             <v-select
             label="Especialidad"
             v-model="curso.specialty"
             :items="specialty"
             item-text="specialty_name"
             item-value="id"
             @change="$v.select.$touch()"
             @blur="$v.select.$touch()"
             required
             ></v-select>
           </v-flex>
           <v-flex xs2 sm2 md2>
            <v-btn flat icon color="primary" @click.native.stop="dialogCrear = true">
              <v-icon>thumb_down</v-icon>
            </v-btn>

            <v-dialog v-model="dialogCrear"  max-width="500px" >
              <v-card>
                <v-toolbar flat dark color="teal darken-1">
                  <v-toolbar-title class="white--text center">Nueva Especialidad</v-toolbar-title>
                </v-toolbar>
                <v-form v-model="valid" ref="formCreate" lazy-validation>
                  <v-card-text>
                    <v-container grid-list-sm>
                      <v-layout wrap> 
                        <v-text-field
                        label="Titulo"
                        v-model="especialidad.title"
                        :counter="50"
                        required
                        ></v-text-field>
                        <v-flex xs12>
                          <v-text-field
                          label="Acerca del curso"
                          multi-line
                          v-model="especialidad.description"
                          rows=3
                          ></v-text-field>
                        </v-flex>
                        <v-select
                         label="Especialidad"
                         v-model="curso.specialty"
                         :items="specialty"
                         item-text="specialty_name"
                         item-value="id"
                         @change="$v.select.$touch()"
                         @blur="$v.select.$touch()"
                         required
                         ></v-select>
                      </v-layout>
                    </v-container>
                    <small>*Campos Obligatorios</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  color="teal darken-1" flat @click.native="dialogCrear = false" >Cancelar</v-btn>
                    <v-btn  color="teal darken-1" flat @click="" >Agregar</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</v-card>
<!-- Mensaje de error -->
<v-snackbar 
v-model="snack.model"
:timeout="snack.timeout"
color="error">
{{ snack.message }}
<v-btn flat color="white" @click.native="snack.model = false">Cerrar</v-btn>
</v-snackbar>
</form>
</v-flex>

</v-layout>
</v-container>



</template>



<script>
import { courceService } from '@/services/Cource.service'
import { nivelService } from '@/services/Nivel.service'
import { especialidadService } from '@/services/Especialidad.service'
export default {
  data () {
    return {
      levels: [],
      specialty: [],
      curso: {},
      especialidad: {},
      dialogCrear: false,
      loadingCurso: false,
      title: '',
      name: 'as',
      valid: true,
      editable: false,
      snack: {
        model: false,
        message: '',
        timeout: 4000
      }
    }
  },
  props: ['dialog'],
  created () {
    let vm = this
    vm.loadNiveles()
    vm.loadEspecialidad()
  },
  methods: {
    submitCurso (model) {
      let vm = this
      vm.loadingCurso = true
      console.log(model)
      courceService.save(model).then(data => {
        console.log(data)
        this.$router.push({name: 'newUnity', params: {id: data.body.id}})
      }, response => {
        vm.loadingCurso = false
        vm.showSnack('Error al crear el curso')
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
    showSnack (message) {
      let vm = this
      vm.snack.message = message
      vm.snack.model = true
    }
  }
}
</script>

