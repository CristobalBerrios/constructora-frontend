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
        <td>{{ props.item.descripcion }}</td>
        <td>{{ props.item.anho }}</td>
        <td>{{ props.item.marca.descripcion }}</td>
      </template>
    </v-data-table>

    <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="setDialog">
      <v-icon dark>add</v-icon>
    </v-btn>
  
    <!-- Modal para agregar una maquinaria -->
    <maquinaria-form :dialog="dialog" @newMaquinaria="pushMaquinaria" @closeDialog="setDialog"></maquinaria-form>
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
        {text: 'Descripcion', value: 'descripcion', sortable: false, align: 'left'},
        {text: 'Año', value: 'anho', sortable: false, align: 'left'},
        {text: 'Marca', value: 'marca', sortable: false, align: 'left'}
      ],
      items: [],
      dialog: false
    }
  },
  components: {MaquinariaForm},
  mounted () {
    maquinariaService.query().then(data => {
      this.items = data.body
    })
  },
  methods: {
    setDialog () {
      this.dialog = !this.dialog
    },
    pushMaquinaria (data) {
      this.items.push(data)
    }
  }
}
</script>

<style scoped>
  
</style>



