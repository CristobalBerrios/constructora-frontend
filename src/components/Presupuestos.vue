<template>
  <section>
    <v-container grid-list-md >
      <v-layout row wrap>
        <v-flex xs12 md4 v-for="presupuesto in presupuestos" :key="presupuesto.id">
          <v-card>
            <v-toolbar flat dark color="deep-orange accent-4">
              <v-toolbar-title class="white--text">Presupuesto</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu>
                <v-btn icon slot="activator">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="showForm(presupuesto.id)">
                    <v-list-tile-title>Editar</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar>
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <div>
                    <div>
                      <p>{{ presupuesto.descripcion }}</p>
                    </div>
                    <br>
                    <div><v-btn @click="showPresupuesto(presupuesto.id)" class="deep-orange accent-4 white--text" raised block>Entrar</v-btn></div>
                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-card-media
                    src="static/document.png"
                    height="125px">
                  </v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-btn fab dark color="blue-grey darken-3" class="btn-flotante" @click="showForm()">
      <v-icon dark>add</v-icon>
    </v-btn>

    <presupuesto-form 
      :dialog="dialog" 
      @newPresupuesto="pushPresupuesto"
      @updatePresupuesto="updatePresupuesto"
      @closeDialog="dialog = false">
    </presupuesto-form>

    <v-snackbar 
      v-model="snack.model"
      :timeout="snack.timeout"
      color="success">
      {{ snack.message }}
      <v-btn flat color="white" @click.native="snack.model = false">Cerrar</v-btn>
    </v-snackbar>
  </section>
</template>

<script>
import presupuestoForm from '@/components/PresupuestoForm'
import {presupuestoObraService} from '@/services/PresupuestoObra.service'
export default {
  data () {
    return {
      presupuestos: [],
      dialog: false,
      idObra: 0,
      snack: {
        model: false,
        message: '',
        timeout: 4000
      }
    }
  },
  components: {presupuestoForm},
  methods: {
    showForm (id) {
      let vm = this
      if (id) vm.$emit('editar', id)
      else vm.$emit('crear')
      vm.dialog = !this.dialog
    },
    showPresupuesto (id) {
      this.$router.push({name: 'showPresupuesto', params: {id: id}})
    },
    pushPresupuesto (newPresupuesto) {
      let vm = this
      vm.presupuestos.push(newPresupuesto)
      vm.showSnack('Presupuesto creado')
    },
    updatePresupuesto () {
      let vm = this
      vm.showSnack('Presupusto actualizado')
      vm.loadPresupuestos()
    },
    loadPresupuestos () {
      let vm = this
      presupuestoObraService.getById(vm.idObra).then(data => {
        vm.presupuestos = data.body
      })
    },
    showSnack (message) {
      let vm = this
      vm.snack.message = message
      vm.snack.model = true
    }
  },
  mounted () {
    let vm = this
    vm.idObra = vm.$route.params.id
    vm.loadPresupuestos()
  }
}
</script>

