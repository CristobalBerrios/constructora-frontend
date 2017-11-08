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
  <v-btn fab dark color="indigo" class="btn-flotante" @click.stop="dialog = true">
    <v-icon dark>add</v-icon>
  </v-btn>

  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal last name" hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Age"
                  required
                  :items="['0-17', '18-29', '30-54', '54+']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { maquinariaService } from '@/services/Maquinaria.service'

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
      dialog: false
    }
  },
  mounted () {
    maquinariaService.getAll().then(data => {
      console.log(data.body)
      this.items = data.body
    })
  }
}
</script>

<style scoped>
  
</style>



