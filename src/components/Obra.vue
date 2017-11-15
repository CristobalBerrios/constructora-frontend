<template>
  <section>
    <v-container grid-list-md >
      <v-layout row wrap>
      <v-flex xs12 md4 v-for="obra in obras" v-bind:key="obra.id">
        <v-card>
          <v-toolbar flat dark color="deep-orange accent-4">
            <v-toolbar-title class="white--text">{{ obra.nombre }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs7>
                <div>
                  <div class="headline">{{ obra.direccion }}</div>
                  <div>{{ obra.ciudad }}</div>
                  <br>
                  <div><v-btn class="deep-orange accent-4 white--text" raised block>Entrar</v-btn></div>
                </div>
              </v-flex>
              <v-flex xs5>
                <v-card-media
                  src="static/ciclovia.jpg"
                  height="125px">
                </v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
    
     <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="showDialog()">
    <v-icon dark>add</v-icon>
  </v-btn>

  <!-- Modal para Agregar una Obra -->
  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-toolbar flat dark color="blue-grey darken-3">
          <v-toolbar-title class="white--text">Nueva Obra</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="dialog = false">
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


  </section>
</template>

 <script>
import { obraService } from '@/services/Obra.service'

export default {
  data () {
    return {
      obras: [],
      newObra: {},
      dialog: false,
      loadingObra: false,
      menu: false
    }
  },
  methods: {
    showDialog () {
      this.dialog = true
    },
    submitObra (data) {
      data.cliente_id = 1
      data.tipo_obra_id = 1
      obraService.save(data).then(data => {
        this.dialog = false
        this.obras.push(data.body.data)
        this.newObra = {}
      })
    }
  },
  mounted () {
    obraService.query().then(data => {
      this.obras = data.body
    })
  }
}
</script>
 