<template>
  <section >
    <v-layout row wrap>
    <v-flex xs10 sm10 md10 offset-xs1 >
     <form>
      <v-card class="pl-4 mt-3">
        <h5 class="text--white pt-3 " >Agregar Unidad</h5>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-layout wrap> 
              <v-flex xs3>
              <v-text-field 
              label="Nombre"
              v-model="unidad.unity_name"
              :counter="50"
              required
              ></v-text-field>
              </v-flex> 
              <v-flex xs5>
                <v-text-field
                label="Descripcion"
                v-model="unidad.unity_description"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
              <v-text-field
              label="Posicion"
              v-model="unidad.unity_orden"
              :counter="3"
              required
              ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select
                label="Nivel"
                v-model="unidad.course_id"
                :items="cursos"
                item-text="cource_title"
                item-value="id"
                required
                @change="loadUnidades"
                ></v-select>
              </v-flex>
              <v-flex xs1> 
               <v-btn  color="primary"  @click="submitUnidad(unidad)" >+</v-btn>
              </v-flex>
            </v-layout>
          </v-layout>
  </v-container>
</v-card>
</form>
</v-flex>
      <v-flex xs10 sm10 md10 offset-xs1 >
        <form>
          <v-card class="pl-4 mt-3">
            <h5 class="text--white pt-3 pb-2" >Unidades</h5>
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
                  </td>
                  <td class="text-xs-right">
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
import { getAllCurseOfUserService } from '@/services/GetAllCurseOfUser.service'
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
        { text: 'Agregar Leccion', value: '' },
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
      })
    },
    loadCursos () {
      let vm = this
      getAllCurseOfUserService.query().then(data => {
        console.log(data.body)
        vm.cursos = data.body
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
      // model.course_id = vm.idCurso
      console.log(model)
      unidadService.save(model).then(data => {
        vm.unidades = data.body
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
    vm.idCurso = vm.$route.params.id
    console.log('id curso ' + vm.$route.params.id)
    vm.loadCurso()
    vm.loadCursos()
  }
}
</script>

<style scoped>
</style>

