<template>
  <section>
    <v-data-table
      v-bind:headers="headers"
      :items="items"
      class="elevation-20"
      rows-per-page-text="Datos por pagina"
    >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.patente }}</td>
      <td>{{ props.item.identificacion }}</td>
      <td>{{ props.item.descripcion }}</td>
      <td>{{ props.item.anho }}</td>
      <td>{{ props.item.marca.descripcion }}</td>
    </template>
  </v-data-table>
  <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="showDialog()">
    <v-icon dark>add</v-icon>
  </v-btn>
  <br><br>

  <v-layout row>
    <v-flex xs4>
      <v-card>
        <v-toolbar class="blue-grey darken-4 white--text">
          <v-toolbar-title>Marcas</v-toolbar-title>
        </v-toolbar>
        <v-list dense >
					<v-list-tile v-for="marca in marcas" v-bind:key="marca.id" @click="">
						<v-list-tile-content>
							<v-list-tile-title>{{ marca.descripcion }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
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
                <v-text-field v-model="maquinaria.patente" label="Patente" required></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model="maquinaria.identificacion" label="Identificacion" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex md2>
                <v-text-field v-model="maquinaria.anho" label="Año" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                  label="Marca"
                  :items="marcas"
                  item-text="descripcion"
                  item-value="id"
                  v-model="maquinaria.marca_id"
                  required
                ></v-select>
              </v-flex>
              <v-flex x6>
                <v-text-field v-model="maquinaria.numero_serie" label="Numero de serie" required></v-text-field>                          
              </v-flex>
              <v-flex xs12>
            <v-text-field
              label="Descripcion"
              v-model="maquinaria.descripcion"
              multi-line
              rows="2"
            ></v-text-field>
              </v-flex>
              <small v-if="errorMaquinaria"  class="red--text">Error al crear la maquinaria</small>
              <v-flex xs12>
                <v-btn :loading="loadingMaquinaria" block dark color="blue-grey darken-3" raised @click="submitMaquinaria(maquinaria)">Agregar</v-btn>
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
        {text: 'Marca', value: 'marca', sortable: false, align: 'left'}
      ],
      items: [],
      dialog: false,
      marcas: [],
      maquinaria: {},
      loadingMaquinaria: false,
      errorMaquinaria: false
    }
  },
  mounted () {
    maquinariaService.query().then(data => {
      console.log(data.body)
      this.items = data.body
    })

    marcaService.query().then(data => {
      this.marcas = data.body
      console.log(this.marcas)
    })
  },
  methods: {
    showDialog () {
      let vm = this
      vm.dialog = true
      marcaService.query().then(data => {
        vm.marcas = data.body
        console.log(vm.marcas)
      })
    },
    submitMaquinaria (model) {
      this.loadingMaquinaria = true
      // console.log(model)
      maquinariaService.save(model).then(data => {
        this.dialog = false
        this.items.push(data.body.data)
      }, response => {
        this.errorMaquinaria = true
        this.loadingMaquinaria = false
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>
  
</style>



