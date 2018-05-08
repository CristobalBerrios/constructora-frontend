UnidadPerCurso.vue<template>
  <section >
<!--         <v-expansion-panel class="mt-2 ml-2 ">
          <v-expansion-panel-content class="">
              <div class="" slot="header"><h5 class="style-p pl-1 mt-1 ">DATOS BASICOS DEL CURSO</h5></div>
                <v-card>
                    <v-card-text class="grey lighten-3"> 
                      <v-layout row wrap offset-xs1>
                <v-flex xs4  >
                   <p class="style-p pl-3"><strong>Nombre Curso: </strong> {{ curso.cource_title }}</p>
                </v-flex>
                 <v-flex xs4  >
                   <p class="style-p pl-3"> <strong>Autor: </strong> {{ curso.cource_title }}</p>
                </v-flex>
                 <v-flex xs4  >
                   <p class="style-p pl-3"><strong>Cantidad de Unidades: </strong> {{ curso.cource_title }}</p>
                </v-flex>
                 </v-layout>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
       </v-expansion-panel> -->

    <v-layout row wrap>
    <v-flex xl3 lg3 md3 xs4 sm10 offset-xs1 >
     <form>
      <v-card class=" mt-3">
        <v-toolbar flat dark color="primary">
          <v-toolbar-title  class="white--text">AGREGAR UNIDAD</v-toolbar-title>
          </v-toolbar>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-layout wrap class="pl-3 pt-3 pb-3 pr-3 "> 
              <v-flex xs12>
              <v-text-field 
              label="Nombre"
              v-model="unidad.unity_name"
              :counter="50"
              required
              ></v-text-field>
              </v-flex> 
              <v-flex xs12>
                <v-text-field
                label="Descripcion"
                v-model="unidad.unity_description"
                multi-line
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
              <v-text-field
              label="Posicion"
              v-model="unidad.unity_orden"
              :counter="3"
              required
              ></v-text-field>
              </v-flex>

              <v-flex xs1> 
               <v-btn  color="primary"  @click="submitUnidad(unidad)" >Agregar</v-btn>
              </v-flex>
            </v-layout>
          </v-layout>
  </v-container>
</v-card>
</form>
</v-flex>
      <v-flex xl6 lg6 md6 xs6 sm10 offset-xs1 >
        <form>
          <v-card class=" mt-3">
             <v-toolbar flat dark color="primary">
          <v-toolbar-title  class="white--text">UNIDADES</v-toolbar-title>
          </v-toolbar>

            <v-container fluid grid-list-md>
                <v-data-table
                  v-bind:headers="headers"
                  :items="unidades"
                  hide-actions
                  v-bind:pagination.sync="pagination"
                >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.unity_orden }}</td>
                  <td class="text-xs-right">{{ props.item.unity_name }}</td>
                  <td class="text-xs-right">{{ props.item.unity_description }}</td>
                  <td class="text-xs-right">
                     <v-btn class="btn-table" color="primary" fab small dark @click="nuevaLeccion(props.item.id)" slot="activator" >
                    L
                </v-btn>
                        <v-btn class="btn-table" color="primary" fab small dark @click="setCurrent(props.item)" slot="activator" @click.native.stop="dialogEditar = true">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn class="btn-table" color="red" fab small dark @click="dlgEliminarTicket = true; ticketDelete = props.item.id" slot="activator">
                  <v-icon>delete</v-icon>
                </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-container>
          </v-card>
        </form>
      </v-flex> 

</v-layout>
  </section>
</template>

<script>
import { courceService } from '@/services/Cource.service'
import { unidadService } from '@/services/Unidad.service'
import { getAllUnityOfCurseService } from '@/services/GetAllUnityOfCurse.service'
export default {
  data () {
    return {
      idCurso: 0,
      curso: {},
      cursos: [],
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
        { text: 'Descripcion', value: 'descriocion' },
        { text: '', value: '' }
      ]
    }
  },
  methods: {
    loadCurso () {
      let vm = this
      courceService.getById(vm.idCurso).then(data => {
        console.log(data.body)
        vm.curso = data.body
        console.log(vm.curso)
      })
    },
    loadUnidades (id) {
      let vm = this
      getAllUnityOfCurseService.getById(id).then(data => {
        console.log(data.body)
        vm.unidades = data.body
      })
    },
    editar () {
      this.editable = false
    },
    submitUnidad (model) {
      let vm = this
      model.course_id = vm.idCurso
      console.log(model)
      unidadService.save(model).then(data => {
        vm.unidades = data.body
        console.log(data)
        vm.dialogCrearUnity = false
      }, response => {
      })
    },
    nuevaLeccion (id) {
      this.$router.push({name: 'contentUnity', params: {id: id}})
    }
  },
  mounted () {
    let vm = this
    vm.idCurso = vm.$route.params.id
    console.log('id curso ' + vm.$route.params.id)
    vm.loadCurso()
    vm.loadUnidades(vm.idCurso)
  }
}
</script>

<style scoped>

.header-card{

}

.toolbar-misCursos{
  padding: 0.2em;
  margin: 0.5em;


}

.expansion-panel__header {
  padding: 0px !important;
}



</style>

