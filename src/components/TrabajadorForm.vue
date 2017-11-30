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
              <v-flex md6>
                <v-text-field :readonly="!editable" v-model="trabajador.persona.nombre" label="Nombre" required></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field :readonly="!editable" v-model="trabajador.persona.rut" label="Rut" required></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field :readonly="!editable" v-model="trabajador.persona.ciudad" label="Ciudad" ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field :readonly="!editable" v-model="trabajador.persona.direccion" label="Dirección" ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field :readonly="!editable" v-model="trabajador.persona.telefono" label="Telefono" required></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field :readonly="!editable" v-model="trabajador.persona.email" label="Email" ></v-text-field>
              </v-flex>
              <v-flex v-if="editable" xs12>
                <v-select
                  label="Area"
                  :items="areas"
                  item-text="descripcion"
                  item-value="id"
                  v-model="trabajador.area_id"
                  required
                ></v-select>
              </v-flex>
              <v-flex v-else xs12>
                <v-text-field :readonly="!editable" v-model="trabajador.area" label="Area" required></v-text-field>
               </v-flex>
              <v-flex v-if="editable" xs12>
                <v-select
                  label="Rendimiento"
                  :items="rendimientos"
                  item-text="descripcion"
                  item-value="id"
                  v-model="trabajador.rendimiento_id"
                  required
                ></v-select>
              </v-flex>
              <v-flex v-else x12>
                <v-text-field :readonly="!editable" v-model="trabajador.rendimiento" label="Rendimiento" required></v-text-field>                          
              </v-flex>
              <v-flex x12>
                <v-text-field :readonly="!editable" v-model="trabajador.sueldo" label="Sueldo" ></v-text-field> 
              </v-flex>
           
              <v-flex v-if="title === 'Trabajador'" xs4>
                <v-switch color="success" label="Editar" v-model="editable"></v-switch>
              </v-flex>
              <v-flex v-if="editable" xs12>
                <v-btn v-if="title !== 'Trabajador'" large :loading="loadingTrabajador" block dark color="blue-grey darken-3" raised @click="submitTrabajador(trabajador)">Agregar</v-btn>
                <v-btn v-else large :loading="loadingTrabajador" block dark color="blue-grey darken-3" raised @click="updateTrabajador(trabajador)">Actualizar</v-btn>
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
import { trabajadorService } from '@/services/Trabajador.service'
import { rendimientoService } from '@/services/Rendimiento.service'
import { areaService } from '@/services/Area.service'

export default {
  data () {
    return {
      area: [],
      rendimiento: [],
      trabajador: {
        persona: {}
      },
      loadingTrabajador: false,
      title: '',
      editable: false,
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
    vm.$parent.$on('ver', id => {
      vm.title = 'Trabajador'
      vm.getTrabajador(id)
      vm.editable = false
    })
    vm.$parent.$on('crear', () => {
      vm.title = 'Nueva Trabajador'
      vm.editable = true
    })
    vm.loadArea()
    vm.loadRendimiento()
  },
  methods: {
    submitTrabajador (model) {
      let vm = this
      vm.loadingTrabajador = true
      console.log(model)
      trabajadorService.save(model).then(data => {
        vm.$emit('newTrabajador', data.body)
        vm.$emit('closeDialog')
        vm.loadingTrabajador = false
      }, response => {
        console.log(response)
        vm.loadingTrabajador = false
        vm.showSnack('Error al crear el trabajador')
      })
    },
    updateTrabajador (model) {
      let vm = this
      vm.loadingTrabajador = true
      console.log(model)
      trabajadorService.update(model.id, model).then(data => {
        vm.$emit('updateTrabajador')
        vm.$emit('closeDialog')
        vm.loadingTrabajador = false
      }, response => {
        console.log(response)
        vm.showSnack('Error al actualizar el trabajador')
        vm.loadingTrabajador = false
      })
    },
    getTrabajador (id) {
      let vm = this
      trabajadorService.getById(id).then(data => {
        vm.trabajador = data.body
        vm.trabajador.area = data.body.area.descripcion
        vm.trabajador.rendimiento = data.body.rendimiento.descripcion
      })
    },
    closeDialog () {
      let vm = this
      vm.trabajador = {
        persona: {}
      }
      vm.$emit('closeDialog')
    },
    loadArea () {
      let vm = this
      areaService.query().then(data => {
        vm.areas = data.body
      })
    },
    loadRendimiento () {
      let vm = this
      rendimientoService.query().then(data => {
        vm.rendimientos = data.body
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