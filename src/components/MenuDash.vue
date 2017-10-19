<template>
  <v-navigation-drawer
      class="blue-grey darken-3 red--text"
      v-model="estado"
      enable-resize-watcher
      app
      dark
    >
    <div class="info-user blue-grey darken-4">
    </div>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>directions</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Obras</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  props: ['estado']
}
</script>

<style scoped>

.info-user {
  height: 200px;
  padding: 100px;
}
</style>


