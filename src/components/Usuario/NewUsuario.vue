<template>
  <section >
    <v-layout row wrap>
      <v-flex xs4 sm4 md4 offset-xs4 >
        <form>
          <v-card class="pl-4 mt-3" color="grey lighten-4" >
            <v-container grid-list-md>
              <v-flex xs10 sm10 md10 offset-xs1 >
                <h2><strong>Formulario de Registro</strong></h2>
                <span>Por favor, rellene el siguiente formulario</span>
                <v-divider ></v-divider>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-text-field box label="Primer nombre" v-model="usuario.nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field box label="Apellido" v-model="usuario.apellido"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      box
                      label="Email"
                      :rules="emailRules"
                      v-model="usuario.email"
                      hint="Ingresa tu email!"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      box
                      label="Nombre Usuario"
                      v-model="usuario.name_user"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      box
                      label="Rut"
                      v-model="usuario.rut"
                      hint="Ingresa tu rut"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                   <v-flex xs12>
                    <v-text-field
                      box
                      name="input-10-1"
                      label="Enter your password"
                      hint="Minimo 8 caracteres"
                      v-model="usuario.password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :type="e1 ? 'password' : 'text'"
                      counter
                    ></v-text-field>
                     <v-btn
                        @click="submitUser(usuario)"
                        :disabled="!valid"
                      >
                        Enviar
                      </v-btn>
                      <v-btn @click="clear">Limpiar</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-container >
          </v-card>
        </form>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { userService } from '@/services/User.service'
export default {
  data () {
    return {
      e1: false,
      valid: true,
      usuario: {},
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail no valido'
      ]
    }
  },
  methods: {
    submitUser (model) {
      console.log(model)
      userService.save(model).then(data => {
        console.log(data)
        // this.$router.push({name: 'editCource', params: {id: data.body.id}})
      }, response => {
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>

