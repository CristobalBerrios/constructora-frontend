<template>
<div>
    <v-toolbar dark  flat color="primary" fixed app>
      <v-toolbar-side-icon @click="toggleMenuDash()"></v-toolbar-side-icon>
      <v-toolbar-title>E-lerning</v-toolbar-title>
      <v-spacer></v-spacer>
 <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
      <v-menu>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="logout()">
            <v-list-tile-title>Cerrar Sesion</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</div>
</template>

<script>
export default {
  methods: {
    toggleMenuDash (evt) {
      // Disparo un evento, para saber cuando mostrar o esconder el menu
      this.$emit('toggle-menu')
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>

</style>
