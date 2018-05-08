<template>
  <v-app light>
     <v-layout row>
       <v-flex xs10 md6 >

        <v-layout row>
          <v-flex xs10 offset-xs6 md6 > 
             <img class="imagen" src="../../static/e-learning01.png" height="396" width="279">
       </v-flex> 
       </v-layout>
       </v-flex>

        <v-flex xs10 md6 >

        <v-layout row>
          <v-flex xs10 offset-xs1 md6 >
            <v-card style="height: 420px;"  class="card--flex-toolbar mt-5  white card-class">
              <v-layout row wrap>
                  <v-flex xs8  md6 offset-md3 class="text-xs-center">
                  
              <p class ="display-2 mt-3">SPECIAB</p>
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
                    <v-btn class="mb-4" :loading="isLoading" @click="submit(credentials)" :disabled="!isValidForm" block  large color="red accent-3 white--text">Iniciar Sesion</v-btn>
                     <v-divider></v-divider>
                     <p class="text-xs-center mt-4">Iniciar sesión con Facebook</p>
                     <p class="text-xs-center">Recuperar Contraseña</p>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card>

            <v-card style="height: 80px;"  class="card--flex-toolbar mt-3  white card-class">
              <v-layout row wrap>
                <v-flex xs10 offset-xs1>
                     <p class="text-xs-center mt-4">Regístrarte</p>
</v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>


       </v-flex> 




</v-layout>

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
.parallax {
  background-color: #1976d2;

}

.card-class {
   border: 1px solid #369;
}

.imagen {
  margin-top: 100px
}
</style>


