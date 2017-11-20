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
        <td><v-btn color="primary" small @click="showMaquinaria(props.item.id)">Ver</v-btn></td>
      </template>
    </v-data-table>

    <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="setDialog('crear')">
      <v-icon dark>add</v-icon>
    </v-btn>
  
    <!-- Modal para agregar una maquinaria -->
    <maquinaria-form :titulo="titulo" tipo="crear" :dialog="dialogCrear" @newMaquinaria="pushMaquinaria" @closeDialog="setDialog('crear')"></maquinaria-form>

    <!-- Modal para ver una maquinaria -->
    <maquinaria-form :maquinaria="maquinaria" tipo="ver" :dialog="dialogVer" @closeDialog="setDialog('ver')"></maquinaria-form>
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
      dialogCrear: false,
      dialogVer: false,
      maquinaria: {}
    }
  },
  components: {MaquinariaForm},
  mounted () {
    maquinariaService.query().then(data => {
      this.items = data.body
    })
  },
  methods: {
    setDialog (tipo, id) {
      if (tipo === 'crear') this.dialogCrear = !this.dialogCrear
      if (tipo === 'ver') this.dialogVer = !this.dialogVer
    },
    pushMaquinaria (data) {
      this.items.push(data)
    },
    showMaquinaria (id) {
      maquinariaService.getById(id).then(data => {
        this.maquinaria = data.body
        this.setDialog('ver')
      })
    }
  }
}
</script>

<style scoped>
  
</style>



