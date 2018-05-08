<template>
  <section>

    <v-card color="primary" offset-xs1>
    <v-layout row wrap offset-xs1>
      <v-flex xs9 >
        <h3 class="white--text pl-5 mt-4">CURSOS CREADOS</h3>
      </v-flex>
      <v-flex xs3  >
          <v-btn
            color="red darken-4"
            class="white--text mt-4"
            @click.native.stop="dialogAddCurso = true"
          >
            Nuevo Curso
            <v-icon right dark>add</v-icon>
          </v-btn>
      </v-flex>
    </v-layout>
    </v-card>
      <v-layout row wrap >
        <v-flex  class="tamaño-card mt-3" xl3 lg3 md3 xs12 sm5 v-for="curso in cursos" :key="curso.id">
          
            <v-card class="card-MisCursos bordes-redondeados">
              <v-card-title primary-title>
                <v-layout row wrap>
                  <v-flex xs4 >
                    <img class="imagen" src="static/50x50.png">
                  </v-flex>
                  <v-flex xs8  >
                    <p class="mb-0">{{ curso.cource_title }}</p>
                  </v-flex>
                </v-layout>

              </v-card-title>
                <v-divider ></v-divider>
             <v-layout row wrap >
                <v-flex xl3 lg3 md3 xs3 sm3 offset-xs2>
                   <v-tooltip bottom>
                   <v-btn flat icon color="primary"  slot="activator" @click="verCurso(curso.id)">
                      <v-icon>mdi-delete</v-icon>
                  </v-btn>
                    <span>Unidades</span>
                  </v-tooltip>
                
              </v-flex>
                <v-flex xl3 lg3 md3 xs3 sm3 >
                   <v-tooltip bottom>
                   <v-btn flat icon color="primary"  slot="activator" @click="verCurso(curso.id)">
                                <v-icon>cached</v-icon>
                              </v-btn>
                    <span>Curso</span>
                  </v-tooltip>
                
              </v-flex>
                <v-flex xl3 lg3 md3 xs3 sm3 >
                   <v-tooltip bottom>
                   <v-btn flat icon color="error"  slot="activator" @click="verCurso(curso.id)">
                                <v-icon>cached</v-icon>
                              </v-btn>
                    <span>Eliminar</span>
                  </v-tooltip>
                
              </v-flex>
                 </v-layout>
            </v-card>
          
        </v-flex>
      </v-layout>


      <!-- DIALOG CREAR CURSO -->

         <v-dialog v-model="dialogAddCurso"  max-width="800px" >
  <v-card>
    <v-toolbar flat dark color="primary">
      <v-toolbar-title class="white--text center">CREAR CURSO</v-toolbar-title>
    </v-toolbar>

    <v-form  >
      <v-card-text>
           <p>Informacion Basica del curso</p>
            <v-divider ></v-divider>
        <v-container grid-list-sm>
                <v-layout row wrap>
                  


           <v-flex xs12 sm12 md5 offset-xs1>
         
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
          <v-flex xs12 sm12 md4 offset-xs1>

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
           <v-flex xs12 sm12 md12>
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
           <!-- <v-flex xs2 sm2 md2>
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
          </v-flex> -->
        </v-layout>
      </v-flex>



                 </v-layout>
  
          </v-layout>
        </v-container>
        <small>*Campos Obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="primary" flat @click.native="dialogAddCurso = false" >Cancelar</v-btn>
        <v-btn  color="primary" flat @click="submitCurso(curso)" >Agregar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>

  </section>
</template>

<script>
import { getAllCurseOfUserService } from '@/services/GetAllCurseOfUser.service'
import { courceService } from '@/services/Cource.service'
import { nivelService } from '@/services/Nivel.service'
import { especialidadService } from '@/services/Especialidad.service'
export default {
  data () {
    return {
      idEspecialidad: 0,
      levels: [],
      specialty: [],
      cursos: [],
      especialidad: {},
      dialogAddCurso: false,
      curso: {}
    }
  },
  mounted () {
    let vm = this
    vm.idEspecialidad = vm.$route.params.id
    console.log(vm.idEspecialidad)
    vm.loadCursos()
    vm.loadNiveles()
    vm.loadEspecialidad()
  },
  methods: {
    submitCurso (model) {
      let vm = this
      console.log(model)
      courceService.save(model).then(data => {
        console.log(data)
        vm.cursos = data.body
      }, response => {
        vm.loadingCurso = false
        vm.showSnack('Error al crear el curso')
      })
    },
    loadCursos () {
      let vm = this
      getAllCurseOfUserService.query().then(data => {
        console.log(data.body)
        vm.cursos = data.body
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
    verCurso (id) {
      this.$router.push({name: 'Unidades', params: {id: id}})
    }
  }
}
</script>

<style scoped>
  .card-MisCursos{
      border-bottom-style: solid;
      border-color: #b71c1c;
      height: 150px !important;;
      margin-bottom: 18px;
      padding-left: 8px;
      padding-right: 8px;  
  }

  .tamaño-card{
      height: 200px;
      margin-bottom: 18px;
      padding-left: 8px;
      padding-right: 8px;  
  }

.imagen{
  max-width: 50px;
  max-height: 50px;
  height: 50px;
  width: 50px;
}

.toolbar-misCursos{
  padding: 0.2em;
  margin: 0.5em;
  background-color: #0d47a1

}
.bordes-redondeados {
  border-radius: 10px 10px 10px 10px;
-moz-border-radius: 10px 10px 10px 10px;
-webkit-border-radius: 10px 10px 10px 10px;

}

.color-fondo {
  background-color: #0d47a1
}
</style>