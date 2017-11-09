<template>
  <section>
    <b2>Maquinarias</b2>
    <v-data-table
      v-bind:headers="headers"
      :items="items"
      class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.patente }}</td>
      <td>{{ props.item.identificacion }}</td>
      <td>{{ props.item.descripcion }}</td>
      <td>{{ props.item.anho }}</td>
      <td>{{ props.item.marca.descripcion }}</td>
      <td>{{ props.item.modelo.descripcion }}</td>
    </template>
  </v-data-table>
  <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="showDialog()">
    <v-icon dark>add</v-icon>
  </v-btn>

  <br> <br>

  <v-layout wrap justify-space-between>
    <v-flex xs12 md3>
      <v-card dark>
        <v-toolbar flat dark color="blue-grey darken-3">
          <v-toolbar-title class="white--text">Marcas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="dialog = false">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list class="grey lighten-1">
          <template>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title> Kobelco</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                 <v-btn dark icon @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title> Kobelco</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn flat >Eliminar</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title> Kobelco</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn flat >Eliminar</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title> Kobelco</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn flat >Eliminar</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 md3>
      <v-card>
    <v-toolbar flat dark color="blue-grey darken-3">
      <v-toolbar-title class="white--text">Ubicaciones</v-toolbar-title>
    </v-toolbar>
  </v-card>
    </v-flex>
  </v-layout>

  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-toolbar flat dark color="blue-grey darken-3">
          <v-toolbar-title class="white--text">Nueva Maquinaria</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md5>
                <v-text-field label="Patente" required></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field label="Identificacion" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex md2>
                <v-text-field label="Año" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Marca"
                  :items="marcas"
                  item-text="descripcion"
                  item-value="id"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
            <v-text-field
              label="Descripcion"
              multi-line
              rows="2"
            ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn block dark color="blue-grey darken-3" raised @click.native="dialog = false">Agregar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { maquinariaService } from '@/services/Maquinaria.service'
import { marcaService } from '@/services/Marca.service'

export default {
  data () {
    return {
      headers: [
        {text: 'Patente', value: 'patente', sortable: false, align: 'left'},
        {text: 'Identificacion', value: 'identificacion', sortable: false, align: 'left'},
        {text: 'Descripcion', value: 'descripcion', sortable: false, align: 'left'},
        {text: 'Año', value: 'anho', sortable: false, align: 'left'},
        {text: 'Marca', value: 'marca', sortable: false, align: 'left'},
        {text: 'Modelo', value: 'modelo', sortable: false, align: 'left'}
      ],
      items: [],
      dialog: false,
      marcas: []
    }
  },
  mounted () {
    maquinariaService.getAll().then(data => {
      console.log(data.body)
      this.items = data.body
    })
  },
  methods: {
    showDialog () {
      let vm = this
      vm.dialog = true
      marcaService.getAll().then(data => {
        vm.marcas = data.body
        console.log(vm.marcas)
      })
    }
  }
}
</script>

<style scoped>
  
</style>



