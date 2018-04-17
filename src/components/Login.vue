<template>
  <v-app light>
    <v-card color="grey lighten-5" flat>
    <v-toolbar dark color="myToolbar green darken-1" flat extended>
      <v-layout>
        <v-flex xs8 offset-xs2 md6 offset-md3 class="text-xs-center">
          <br><br>
          <h4>E-lerning</h4>
      </v-flex>
      </v-layout>
    </v-toolbar>
    <v-layout row>
      <v-flex xs10 offset-xs1 md6 offset-md3>
        <v-card style="height: 350px;" class="card--flex-toolbar grey lighten-3">
          <br>
          <v-layout row wrap>
            <v-flex xs4 offset-xs4 class="text-xs-center">
              <img src="../assets/loginElerning.png" height="90px" alt="">
            </v-flex>
            <v-flex xs10 offset-xs1>
              <v-form>
                <v-text-field
                  label="Correo Electronico"
                  type="email"
                  v-model="credentials.email"
                  color="blue-grey darken-1"
                  required
                ></v-text-field>
                <v-text-field
                  label="Contraseña"
                  v-model="credentials.password"
                  type="password"
                  color="blue-grey darken-1"
                  required
                ></v-text-field>
                <small v-if="errorLogin" class="red--text">Credenciales erroneas</small>
                <v-btn :loading="isLoading" @click="submit(credentials)" :disabled="!isValidForm" block round large color="red accent-3 white--text">Iniciar Sesion</v-btn>
                
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
  </v-app>
</template>

<script>
import { loginService } from '@/services/Login.service'
import CredentialsServices from '@/services/Credentials.service.js'

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      errorLogin: false,
      credentialService: new CredentialsServices(),
      isLoading: false
    }
  },
  methods: {
    submit (credentials) {
      this.isLoading = true
      loginService.authenticate(credentials).then(data => {
        this.credentialService.setToken(data.body.token)
        // this.credentialService.setCurrentUser(data.body.user)
        // this.credentialService.setEmpresaUser(data.body.razon_social)
        console.log(data.body)
        this.$router.push('showAllSpecialty')
      }, err => {
        if (err.status) {
          this.errorLogin = true
          this.isLoading = false
          console.log(err)
          console.log('hay error en el login')
        }
      })
    }
  },
  computed: {
    isValidForm () {
      return this.credentials.email !== '' && this.credentials.password !== ''
    }
  }
}
</script>

<style scoped>
  .card--flex-toolbar {
    margin-top: -100px;
  }

  .myToolbar {
    height: 200px;
  }
</style>


