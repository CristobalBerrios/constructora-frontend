<template>
  <v-navigation-drawer
      class="blue-grey darken-3 white--text"
      v-model="estado"
      v-on:input="setEstado()"
      width="230"
      persistent
      enable-resize-watcher
      app
      dark
    >
    <div class="caja-info blue-grey darken-4">
      <div class="info-user">
        <img src="../assets/user.png" alt="" height="90px">
        <p>{{ usuario }}</p>
      </div>
     
    </div>
      <v-list dense>
        <v-list-tile @click="go('obras')">
          <v-list-tile-action>
            <img src="../assets/shovel.png" alt="">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Obras</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('trabajadores')">
          <v-list-tile-action>
            <img src="../assets/engineer.png" alt="">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Trabajadores</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('maquinaria')">
          <v-list-tile-action>
            <img src="../assets/loader.png" alt="">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Maquinaria</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('materiales')">
          <v-list-tile-action>
            <img src="../assets/wheelbarrow.png" alt="">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Materiales</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('proveedores')">
          <v-list-tile-action>
            <img src="../assets/cart.png" alt="">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Proveedores</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      estado: null
    }
  },
  props: ['estado', 'usuario'],
  methods: {
    go (ruta) {
      this.$router.push(ruta)
    },
    setEstado () {
      this.$emit('setEstado')
    }
  }
}
</script>

<style scoped>

.caja-info {
  height: 200px;
  text-align: center;
}

.info-user {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
}
</style>


