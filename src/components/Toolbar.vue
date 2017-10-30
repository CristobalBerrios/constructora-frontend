<template>
<div>
    <menu-dash :estado="estadoDash"></menu-dash>
    <v-toolbar class="white" fixed app>
    <v-toolbar-side-icon @click="estadoDash = !estadoDash"></v-toolbar-side-icon>
    <v-toolbar-title>Constructora</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</div>
</template>

<script>

import MenuDash from '@/components/MenuDash'

export default {
  data () {
    return {
      estadoDash: true
    }
  },
  components: { MenuDash },
  methods: {
    toggleMenuDash (evt) {
      console.log(evt)
      this.$dispatch('toggle-menu-dash')
      // this.estadoDash = !this.estadoDash
    }
  }
}
</script>

<style scoped>

</style>
