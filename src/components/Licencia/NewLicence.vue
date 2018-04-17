<template>
  <section >
    <v-layout row wrap>
    <v-flex xs10 sm10 md10 offset-xs1 >
     <form>
      <v-card class="pl-4 mt-3">
        <h5 class="text--white pt-3 pb-2" >Formulario Para Crear Una Licencia</h5>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs3>
            <v-subheader>Nombre Licencia:</v-subheader>
          </v-flex>
          <v-flex xs9>
              <v-text-field
              label="Nombre Licencia"
              v-model="licence.licence_name"
              :counter="50"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-subheader>Cantidad de usuario:</v-subheader>
          </v-flex>
          <v-flex xs3>
              <v-text-field
              label="Ej: 50"
              v-model="licence.licence_user"
              :counter="50"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-subheader>Fecha expiracion:</v-subheader>
          </v-flex>
          <v-flex xs3 sm3>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                label="Fecha"
                v-model="licence.licence_expiration"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>
                    <v-btn flat color="primary" @click="save">Guardar</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <v-text-field
            name="input-7-1"
            label="Acerca de la Leccion"
            multi-line
            v-model="licence.licence_observacion"
            rows=3
            ></v-text-field>
          </v-flex>
             <v-btn class="primary mb-4" @click="submitLicence(licence)">Crear Licence</v-btn>
    </v-layout>
  </v-container>
</v-card>
</form>
</v-flex>


</v-layout>
  </section>
</template>

<script>
import { licenceService } from '@/services/Licence.service'
export default {
  data () {
    return {
      idUnidad: 0,
      editable: true,
      licence: {},
      pagination: {},
      title: '',
      valid: true,
      date: null,
      menu: false,
      dialogCrearUnity: false,
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Unidad', value: 'unidad' },
        { text: 'Editar', value: 'editar' }
      ]
    }
  },
  methods: {
    submitLicence (model) {
      console.log(model)
      licenceService.save(model).then(data => {
        console.log(data)
        // this.$router.push({name: 'editCource', params: {id: data.body.id}})
      }, response => {
      })
    }
  },
  mounted () {
    let vm = this
    vm.idUnidad = vm.$route.params.id
    console.log('id unidad' + vm.$route.params.id)
  }
}
</script>

<style scoped>
</style>

