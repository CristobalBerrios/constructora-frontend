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
              <v-flex md5>
                <v-text-field :readonly="!editable" v-model="maquinaria.patente" label="Patente" required></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field :readonly="!editable" v-model="maquinaria.identificacion" label="Identificacion" required></v-text-field>
              </v-flex>
              <v-flex md2>
                <v-text-field :readonly="!editable" v-model="maquinaria.anho" label="Año" required></v-text-field>
              </v-flex>
              <v-flex v-if="editable" xs6>
                <v-select
                  label="Marca"
                  :items="marcas"
                  item-text="descripcion"
                  item-value="id"
                  v-model="maquinaria.marca_id"
                  required
                ></v-select>
              </v-flex>
              <v-flex v-else x6>
                <v-text-field :readonly="!editable" v-model="maquinaria.marca" label="Marca" required></v-text-field>                          
              </v-flex>
              <v-flex x6>
                <v-text-field :readonly="!editable" v-model="maquinaria.numero_serie" label="Numero de serie" required></v-text-field>                          
              </v-flex>
              <v-flex xs12>
            <v-text-field
              label="Descripcion"
              v-model="maquinaria.descripcion"
              :readonly="!editable"
              multi-line
              rows="2"
            ></v-text-field>
              </v-flex>
              <v-flex v-if="title === 'Maquinaria'" xs4>
                <v-switch color="success" label="Editar" v-model="editable"></v-switch>
              </v-flex>
              <v-flex v-if="editable" xs12>
                <v-btn v-if="title !== 'Maquinaria'" large :loading="loadingMaquinaria" block dark color="blue-grey darken-3" raised @click="submitMaquinaria(maquinaria)">Agregar</v-btn>
                <v-btn v-else large :loading="loadingMaquinaria" block dark color="blue-grey darken-3" raised @click="updateMaquinaria(maquinaria)">Actualizar</v-btn>
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
import { maquinariaService } from '@/services/Maquinaria.service'
import { marcaService } from '@/services/Marca.service'

export default {
  data () {
    return {
      marcas: [],
      maquinaria: {},
      loadingMaquinaria: false,
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
      vm.title = 'Maquinaria'
      vm.getMaquinaria(id)
      vm.editable = false
    })
    vm.$parent.$on('crear', () => {
      vm.title = 'Nueva Maquinaria'
      vm.editable = true
    })
    vm.loadMarcas()
  },
  methods: {
    submitMaquinaria (model) {
      let vm = this
      vm.loadingMaquinaria = true
      maquinariaService.save(model).then(data => {
        vm.$emit('newMaquinaria', data.body)
        vm.$emit('closeDialog')
        vm.loadingMaquinaria = false
      }, response => {
        vm.loadingMaquinaria = false
        vm.showSnack('Error al crear la maquinaria')
      })
    },
    updateMaquinaria (model) {
      let vm = this
      vm.loadingMaquinaria = true
      maquinariaService.update(model.id, model).then(data => {
        vm.$emit('updateMaquinaria')
        vm.$emit('closeDialog')
        vm.loadingMaquinaria = false
      }, response => {
        vm.showSnack('Error al actualizar la maquinaria')
        vm.loadingMaquinaria = false
      })
    },
    getMaquinaria (id) {
      let vm = this
      maquinariaService.getById(id).then(data => {
        vm.maquinaria = data.body
        vm.maquinaria.marca = data.body.marca.descripcion
      })
    },
    closeDialog () {
      let vm = this
      vm.maquinaria = {}
      vm.$emit('closeDialog')
    },
    loadMarcas () {
      let vm = this
      marcaService.query().then(data => {
        vm.marcas = data.body
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

