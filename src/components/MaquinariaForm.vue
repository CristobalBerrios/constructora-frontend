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
                <v-text-field :readonly="tipo === 'ver'" v-model="maquinaria.patente" label="Patente" required></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field :readonly="tipo === 'ver'" v-model="maquinaria.identificacion" label="Identificacion" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex md2>
                <v-text-field :readonly="tipo === 'ver'" v-model="maquinaria.anho" label="Año" required></v-text-field>
              </v-flex>
              <v-flex v-if="tipo === 'crear'" xs6>
                <v-select
                  label="Marca"
                  :items="marcas"
                  item-text="descripcion"
                  item-value="id"
                  v-model="maquinaria.marca_id"
                  required
                ></v-select>
              </v-flex>
              <v-flex x6 v-if="tipo === 'ver'">
                <v-text-field :readonly="tipo === 'ver'" v-model="maquinaria.marca.descripcion" label="Marca" required></v-text-field>                          
              </v-flex>
              <v-flex x6>
                <v-text-field :readonly="tipo === 'ver'" v-model="maquinaria.numero_serie" label="Numero de serie" required></v-text-field>                          
              </v-flex>
              <v-flex xs12>
            <v-text-field
              label="Descripcion"
              v-model="maquinaria.descripcion"
              :readonly="tipo === 'ver'"
              multi-line
              rows="2"
            ></v-text-field>
              </v-flex>
              <small v-if="errorMaquinaria"  class="red--text">Error al crear la maquinaria</small>
              <v-flex xs12 v-if="tipo === 'crear'">
                <v-btn :loading="loadingMaquinaria" block dark color="blue-grey darken-3" raised @click="submitMaquinaria(maquinaria)">Agregar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
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
      errorMaquinaria: false,
      title: '',
      tipo: '',
      editable: true
    }
  },
  props: ['dialog', 'tipo'],
  created () {
    this.$parent.$on('ver', this.showMaquinaria)
    this.$parent.$on('crear', this.createMaquinaria)
  },
  methods: {
    submitMaquinaria (model) {
      let vm = this
      vm.loadingMaquinaria = true
      maquinariaService.save(model).then(data => {
        vm.$emit('newMaquinaria', data)
        vm.$emit('closeDialog')
      }, response => {
        vm.errorMaquinaria = true
        vm.loadingMaquinaria = false
      })
    },
    closeDialog () {
      this.maquinaria = {}
      this.$emit('closeDialog')
    },
    createMaquinaria () {
      this.title = 'Nueva Maquinaria'
      marcaService.query().then(data => {
        this.marcas = data.body
      })
    },
    showMaquinaria (id) {
      this.title = 'Maquinaria'
      maquinariaService.getById(id).then(data => {
        this.maquinaria = data.body
        console.log(data)
      })
    }
  }
}
</script>
