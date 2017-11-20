<template>
  <v-navigation-drawer
      class="blue-grey darken-4 white--text"
      v-model="estado"
      v-on:input="setEstado()"
      width="230"
      persistent
      enable-resize-watcher
      app
      dark
    >
   
    <div class="caja-info">
      <div class="info-user">
        <v-list class="lista">
          <v-list-tile>
            <v-list-tile-avatar>
              <img src="../assets/user.png" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ empresa }}</v-list-tile-title>
              <v-list-tile-sub-title>{{usuario}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </div>
    
      <v-list dense>
        <v-list-tile @click="go('obras')">
          <v-list-tile-action>
            <img src="../assets/shovel.png" alt="" class="icon">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Obras</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('trabajadores')">
          <v-list-tile-action>
            <img src="../assets/engineer.png" alt="" class="icon">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Trabajadores</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('maquinarias')">
          <v-list-tile-action>
            <img src="../assets/loader.png" alt="" class="icon">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Maquinaria</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('materiales')">
          <v-list-tile-action>
            <img src="../assets/wheelbarrow.png" alt="" class="icon">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Materiales</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('proveedores')">
          <v-list-tile-action>
            <img src="../assets/cart.png" alt="" class="icon">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Proveedores</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group dense>
          <v-list-tile slot="item" @click="">
            <v-list-tile-action >
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Configuraciones</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="go('obras')">
            <v-list-tile-content>
              <v-list-tile-title>Obras</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('obras')">
            <v-list-tile-content>
              <v-list-tile-title>Marcas</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: ['estado', 'usuario', 'empresa'],
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
  height: 120px;
  background-image: url('../assets/fondo_dash.png');
  background-size: cover;
  background-position: center;
}

.lista {
  height: 100%;
}


.info-user {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  font-size: 1.2em;
}

.icon {
  height: 25px;
}


</style>


