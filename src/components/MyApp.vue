<template>
  <v-app light>
    <menu-dash :usuario="usuario" :estado.sync="estadoMenu"></menu-dash>
    <toolbar v-on:toggle-menu="toggle()" v-on:logout="logout()"></toolbar>
    <main class="grey lighten-2">
      <v-content>
        <v-container fluid>
        <router-view></router-view>
			</v-container>
      </v-content>
		</main>
  </v-app>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import MenuDash from '@/components/MenuDash'
  import CredentialServices from '@/services/Credentials.service.js'

  export default {
    data () {
      return {
        estadoMenu: true,
        usuario: '',
        credentialService: new CredentialServices()
      }
    },
    components: { Toolbar, MenuDash },
    mounted () {
      let vm = this
      vm.usuario = vm.credentialService.getCurrentUser()
    },
    methods: {
      toggle () {
        this.estadoMenu = !this.estadoMenu
      },
      logout () {
        this.credentialService.clearCredentials()
        this.$router.push('/login')
      }
    }
  }

</script>

<style lang="stylus">
  @import '../stylus/main'
  
  .btn-flotante {
    position: fixed;
    right: 8px;
    bottom: 8px;
  }
</style>
