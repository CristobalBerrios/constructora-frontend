<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-toolbar flat dark color="blue-grey darken-3">
          <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field 
                  multi-line
                  rows="2" 
                  v-model="presupuesto.descripcion" 
                  label="Descripcion" 
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  v-model="presupuesto.vigencia" 
                  label="Vigencia (dias)"
                  type="number"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  v-model="presupuesto.periodo_control" 
                  label="Periodo de control"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Formas de Pago"
                  :items="formasPago"
                  item-text="detalle"
                  item-value="id"
                  v-model="presupuesto.forma_pago_id"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-btn v-if="title === 'Nuevo Presupuesto'" large :loading="loadingPresupuesto" block dark color="blue-grey darken-3" raised @click="submitPresupuesto(presupuesto)">Agregar</v-btn>
                <v-btn v-else large :loading="loadingPresupuesto" block dark color="blue-grey darken-3" raised @click="updatePresupuesto(presupuesto)">Actualizar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      
      <!-- Mensaje de error -->
      <v-snackbar 
      v-model="snack.model"
      :timeout="snack.timeout"
      color="error">
      {{ snack.message }}
      <v-btn flat color="white" @click.native="snack.model = false">Cerrar</v-btn>
    </v-snackbar>

  </v-dialog>
</template>

<script>
import { formasPagoService } from '@/services/FormasPago.service'
import { presupuestoService } from '@/services/Presupuesto.service'

export default {
  data () {
    return {
      formasPago: [],
      presupuesto: {},
      loadingPresupuesto: false,
      title: '',
      snack: {
        model: false,
        message: '',
        timeout: 4000
      }
    }
  },
  props: ['dialog'],
  created () {
    let vm = this
    vm.$parent.$on('editar', id => {
      vm.title = 'Editar Presupuesto'
      vm.getPresupuesto(id)
    })
    vm.$parent.$on('crear', () => {
      vm.title = 'Nuevo Presupuesto'
    })
    vm.loadFormasPago()
  },
  methods: {
    submitPresupuesto (model) {
      let vm = this
      model.obra_id = vm.$route.params.id
      model.estado_id = 2
      vm.loadingPresupuesto = true
      presupuestoService.save(model).then(data => {
        vm.$emit('newPresupuesto', data.body)
        vm.$emit('closeDialog')
        vm.loadingPresupuesto = false
        console.log(data)
      }, response => {
        vm.loadingPresupuesto = false
        vm.showSnack('Error al crear el presupuesto')
        console.log(response)
      })
    },
    updatePresupuesto (model) {
      let vm = this
      vm.loadingPresupuesto = true
      presupuestoService.update(model.id, model).then(data => {
        vm.$emit('updatePresupuesto')
        vm.$emit('closeDialog')
        vm.loadingPresupuesto = false
      }, response => {
        vm.showSnack('Error al actualizar la Presupuesto')
        vm.loadingPresupuesto = false
      })
    },
    getPresupuesto (id) {
      let vm = this
      presupuestoService.getById(id).then(data => {
        vm.presupuesto = data.body
      })
    },
    closeDialog () {
      let vm = this
      vm.presupuesto = {}
      vm.$emit('closeDialog')
    },
    loadFormasPago () {
      let vm = this
      formasPagoService.query().then(data => {
        vm.formasPago = data.body
      })
    },
    showSnack (message) {
      let vm = this
      vm.snack.message = message
      vm.snack.model = true
    }
  }
}
</script>

