<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-toolbar flat dark color="blue-grey darken-3">
          <v-toolbar-title class="white--text">Nueva Obra</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12
                <v-text-field v-model="newObra.nombre" label="Nombre" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newObra.direccion" label="Direccion" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newObra.ciudad" label="Ciudad" required></v-text-field>
              </v-flex>
              <v-flex xs12>
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
                    v-model="newObra.fecha"
                    readonly
                  ></v-text-field>
                  <v-date-picker locale="es-sp" :first-day-of-week="1" v-model="newObra.fecha" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-btn :loading="loadingObra" block dark color="blue-grey darken-3" raised @click="submitObra(newObra)">Agregar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import { obraService } from '@/services/Obra.service'

export default {
  data () {
    return {
      newObra: {},
      menu: false,
      loadingObra: false
    }
  },
  props: ['dialog', 'tipo'],
  methods: {
    submitObra (data) {
      data.cliente_id = 1
      data.tipo_obra_id = 1
      obraService.save(data).then(data => {
        this.newObra = {}
        this.$emit('newObra', data)
        this.$emit('closeDialog')
      })
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

