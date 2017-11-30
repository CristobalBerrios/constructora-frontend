

<template>
  <section>
    <v-card dark>

    <v-card-title>
      Trabajador
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
        v-model="search"
        color="white"
        dark
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      class="elevation-5"
      dark
      rows-per-page-text="Datos por pagina">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.persona.nombre }}</td>
        <td class="text-xs-left">{{ props.item.persona.telefono }}</td>
        <td class="text-xs-left">{{ props.item.persona.email }}</td>
        <td class="text-xs-left">{{ props.item.rendimiento.descripcion }}</td>
        <td class="text-xs-left">{{ props.item.area.descripcion}}</td>
        <td class="text-xs-left"><v-btn color="primary" small @click="showForm(props.item.id)">Ver</v-btn></td>
      </template>
    </v-data-table>
    </v-card>
    <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="showForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
  
    <!-- Modal para agregar una maquinaria -->
    <trabajador-form 
    :dialog="dialog" 
    @newTrabajador="pushTrabajador"
    @updateTrabajador = "updateTrabajador"
    @closeDialog="dialog = false">
    </trabajador-form>

    <v-snackbar 
      v-model="snack.model"
      :timeout="snack.timeout"
      color="success">
      {{ snack.message }}
      <v-btn flat color="white" @click.native="snack.model = false">Cerrar</v-btn>
    </v-snackbar>
  
  </section>
</template>

<script>
import { trabajadorService } from '@/services/Trabajador.service'
import TrabajadorForm from '@/components/TrabajadorForm'

export default {
  data () {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [
        {text: 'Nombre', value: 'persona.nombre', sortable: true, align: 'left'},
        {text: 'Telefono', value: 'telefono', sortable: true, align: 'left'},
        {text: 'Email', value: 'email', sortable: true, align: 'left'},
        {text: 'Estado', value: 'rendimiento', sortable: true, align: 'left'},
        {text: 'Area', value: 'area', sortable: true, align: 'left'}
      ],
      items: [],
      dialog: false,
      snack: {
        model: false,
        message: '',
        timeout: 4000
      },
      maquinaria: {}
    }
  },
  components: {TrabajadorForm},
  mounted () {
    let vm = this
    vm.loadTrabajadores()
  },
  methods: {
    loadTrabajadores () {
      let vm = this
      trabajadorService.query().then(data => {
        vm.items = data.body
      })
    },
    pushTrabajador (data) {
      let vm = this
      vm.items.push(data)
      vm.showSnack('Trabajador agregada con exito')
    },
    updateTrabajador (message) {
      let vm = this
      vm.loadTrabajadores()
      vm.showSnack('Trabajador actualizada con exito')
    },
    showForm (id) {
      let vm = this
      if (id) vm.$emit('ver', id)
      else vm.$emit('crear')
      vm.dialog = !this.dialog
    },
    showSnack (message) {
      let vm = this
      vm.snack.message = message
      vm.snack.model = true
    }
  }
}
</script>

<style scoped>
  
</style>