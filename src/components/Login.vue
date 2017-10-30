<template>
  <v-app light>
    <v-card color="grey lighten-5" flat>
    <v-toolbar dark color="myToolbar blue-grey darken-3" flat extended>
      <v-layout>
        <v-flex xs8 offset-xs2 md6 offset-md3 class="text-xs-center">
          <br><br>
          <h4>Mi Constructora</h4>
      </v-flex>
      </v-layout>
    </v-toolbar>
    <v-layout row>
      <v-flex xs10 offset-xs1 md6 offset-md3>
        <v-card style="height: 340px;" class="card--flex-toolbar grey lighten-3">
          <br>
          <v-layout row wrap>
            <v-flex xs4 offset-xs4 class="text-xs-center">
              <img src="../assets/engineer-1.png" height="90px" alt="">
            </v-flex>
            <v-flex xs10 offset-xs1>
              <v-form>
                <v-text-field
                  label="Correo Electronico"
                  type="email"
                  required
                ></v-text-field>
                <v-text-field
                  label="Contraseña"
                  type="password"
                  required
                ></v-text-field>
                <router-link to="/" style="text-decoration:none;">
                  <v-btn block round large color="blue-grey darken-3 white--text">Iniciar Sesion</v-btn>
                </router-link>
                
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
export default {
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


