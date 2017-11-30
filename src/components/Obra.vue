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
                    <div>
                      <v-btn @click="verObra(obra.id)" class="deep-orange accent-4 white--text" raised block>Entrar</v-btn>
                    </div>
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
    
    <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="setDialog()">
      <v-icon dark>add</v-icon>
    </v-btn>

    <!-- Modal para Agregar una Obra -->
    <obra-form :dialog="dialog" @newObra="pushObra" @closeDialog="setDialog"></obra-form>

  </section>
</template>

 <script>
import { obraService } from '@/services/Obra.service'
import obraForm from '@/components/ObraForm'

export default {
  data () {
    return {
      obras: [],
      dialog: false
    }
  },
  components: {obraForm},
  methods: {
    setDialog () {
      this.dialog = !this.dialog
    },
    pushObra (data) {
      this.obras.push(data)
    },
    verObra (id) {
      this.$router.push({name: 'presupuestos', params: {id: id}})
    }
  },
  mounted () {
    obraService.query().then(data => {
      this.obras = data.body
    })
  }
}
</script>
 