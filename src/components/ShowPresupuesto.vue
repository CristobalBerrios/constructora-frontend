<template>
  <section>
    <v-card class="card">
      <v-layout row wrap>
        <v-flex xs12>
        <v-text-field 
          multi-line
          rows="2" 
          v-model="presupuesto.descripcion" 
          label="Descripción"
          readonly>
        </v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-text-field 
          v-model="presupuesto.vigencia" 
          label="Vigencia (dias)"
          type="number"
          readonly>
        </v-text-field>
      </v-flex>
      <v-flex offset-xs1 xs4>
        <v-text-field
          v-model="presupuesto.periodo_control" 
          label="Periodo de control"
          readonly>
        </v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-text-field
          v-model="presupuesto.forma_pago.detalle" 
          label="Forma de Pago"
          readonly>
        </v-text-field>
      </v-flex>
      <v-flex offset-xs1 xs4>
        <v-text-field
          v-model="presupuesto.estado.descripcion" 
          label="Estado"
          readonly>
        </v-text-field>
      </v-flex>
      </v-layout>
      <v-divider></v-divider><br>
      <v-layout row wrap v-for="partida in presupuesto.partida" :key="partida.id">
        <div class="partida">
          <h4>{{ partida.detalle }}</h4>
          <v-data-table
            :headers="headersItems"
            :items="partida.items"
            class="elevation-5"
            rows-per-page-text="Datos por pagina">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.detalle }}</td>
              <td>{{ props.item.unidad }}</td>
              <td>{{ props.item.cantidad }}</td>
              <td>{{ props.item.total }}</td>
            </template>
          </v-data-table>
        </div>
      </v-layout>
    </v-card>
  </section>
</template>

<script>
import {presupuestoPartidaService} from '@/services/PresupuestoPartida.service'
export default {
  data () {
    return {
      presupuesto: {
        forma_pago: {},
        estado: {}
      },
      headersItems: [
        {text: 'Detalle', value: 'detalle', sortable: false, align: 'left'},
        {text: 'Unidad', value: 'unidad', sortable: false, align: 'left'},
        {text: 'Cantidad', value: 'cantidad', sortable: false, align: 'left'},
        {text: 'Total', value: 'total', sortable: false, align: 'left'}
      ]
    }
  },
  created () {
    let vm = this
    let id = vm.$route.params.id
    presupuestoPartidaService.getById(id).then(data => {
      vm.presupuesto = data.body
      console.log(data.body)
    })
  }
}
</script>

<style scoped>
  .card {
    padding: 20px;
  }

  .partida {
    padding: 10px;
    width: 80%;
  }
</style>