<template>
  <v-app light>
    <menu-dash :empresa="empresa" :usuario="usuario" :estado.sync="estadoMenu"></menu-dash>
    <toolbar v-on:toggle-menu="toggle()" v-on:logout="logout()"></toolbar>
    <main class="">
      <v-content>
        <v-container class="pl-0 pb-0 pt-0 pr-0" fluid>
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
        empresa: '',
        credentialService: new CredentialServices()
      }
    },
    components: { Toolbar, MenuDash },
    mounted () {
      let vm = this
      vm.usuario = vm.credentialService.getCurrentUser()
      vm.empresa = vm.credentialService.getEmpresaUser()
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
  

</style>
