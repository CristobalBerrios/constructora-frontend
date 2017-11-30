<template>
  <section>
    <v-card dark>

    <v-card-title>
      Material
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
        <td class="text-xs-left">{{ props.item.nombre }}</td>
        <td class="text-xs-left">{{ props.item.stock}}</td>
        <td class="text-xs-left">{{ props.item.observacion }}</td>
        <td class="text-xs-left">{{ props.item.descripcion }}</td>
        <td class="text-xs-left">{{ props.item.valor}}</td>
        <td class="text-xs-left"><v-btn color="primary" small @click="showForm(props.item.id)">Ver</v-btn></td>
      </template>
    </v-data-table>
    </v-card>
    <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="showForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
  
    <!-- Modal para agregar un material -->
    <material-form 
    :dialog="dialog" 
    @newMaterial="pushMaterial"
    @updateMaterial = "updateMaterial"
    @closeDialog="dialog = false">
    </material-form>

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
import { materialService } from '@/services/Material.service'
import MaterialForm from '@/components/MaterialForm'

export default {
  data () {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [
        {text: 'Nombre', value: 'nombre', sortable: true, align: 'left'},
        {text: 'Stock', value: 'stock', sortable: true, align: 'left'},
        {text: 'Observacion', value: 'observacion', sortable: true, align: 'left'},
        {text: 'Descripcion', value: 'descripcion', sortable: true, align: 'left'},
        {text: 'Valor', value: 'valor', sortable: true, align: 'left'}
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
  components: {MaterialForm},
  mounted () {
    let vm = this
    vm.loadMateriales()
  },
  methods: {
    loadMateriales () {
      let vm = this
      materialService.query().then(data => {
        vm.items = data.body
      })
    },
    pushMaterial (data) {
      let vm = this
      vm.items.push(data)
      vm.showSnack('Material agregado con exito')
    },
    updateMaterial (message) {
      let vm = this
      vm.loadMateriales()
      vm.showSnack('Material actualizada con exito')
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