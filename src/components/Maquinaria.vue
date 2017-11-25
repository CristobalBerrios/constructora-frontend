<template>
  <section>
    <v-data-table
      v-bind:headers="headers"
      :items="items"
      class="elevation-5"
      rows-per-page-text="Datos por pagina">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.patente }}</td>
        <td>{{ props.item.identificacion }}</td>
        <td>{{ props.item.anho }}</td>
        <td>{{ props.item.marca.descripcion }}</td>
        <td><v-btn color="primary" small @click="showForm(props.item.id)">Ver</v-btn></td>
      </template>
    </v-data-table>

    <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="showForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
  
    <!-- Modal para agregar una maquinaria -->
    <maquinaria-form 
    :dialog="dialog" 
    @newMaquinaria="pushMaquinaria"
    @updateMaquinaria = "updateMaquinaria"
    @closeDialog="dialog = false">
    </maquinaria-form>

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
import { maquinariaService } from '@/services/Maquinaria.service'
import MaquinariaForm from '@/components/MaquinariaForm'

export default {
  data () {
    return {
      headers: [
        {text: 'Patente', value: 'patente', sortable: false, align: 'left'},
        {text: 'Identificacion', value: 'identificacion', sortable: false, align: 'left'},
        {text: 'Año', value: 'anho', sortable: false, align: 'left'},
        {text: 'Marca', value: 'marca', sortable: false, align: 'left'}
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
  components: {MaquinariaForm},
  mounted () {
    let vm = this
    vm.loadMaquinarias()
  },
  methods: {
    loadMaquinarias () {
      let vm = this
      maquinariaService.query().then(data => {
        vm.items = data.body
      })
    },
    pushMaquinaria (data) {
      let vm = this
      vm.items.push(data)
      vm.showSnack('Maquinaria agregada con exito')
    },
    updateMaquinaria (message) {
      let vm = this
      vm.loadMaquinarias()
      vm.showSnack('Maquinaria actualizada con exito')
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



