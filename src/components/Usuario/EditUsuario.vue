
 <template >
   <div class="div">
  <section >




    <v-container grid-list-md>
      <form enctype="multipart/form-data">
               <p class="p-titulo display-1  "><strong>Editar Perfil</strong></p>
        <v-layout row wrap>
          <v-flex xs4 sm4 md4 offset-xs1 class="izquierda">
              <div class="foto-perfil">
                <v-flex
                xs12
                sm6
                md8
                text-xs-center
                layout
                align-center
                justify-center
              >
                <v-avatar

                  size="120px"
                  class="grey lighten-4"
                >
                  <img :src="'http://localhost:8000/api/getPhotoPerfil/' + usuario.avatar"/>
                </v-avatar>
              </v-flex>
              <v-flex
                xs12
                sm6
                md8
                text-xs-center
                layout
                align-center
                justify-center
              >
                 <input class="btn-img" type="file" accept="image/*;capture=camera" @change="procesarArchivo($event)">
              </v-flex>
              </div>
          </v-flex>

          <v-flex class="derecha" xs6 sm6 md6  offset-xs1>
            <p class=" display-1  "><strong>Tus Datos</strong></p>
            <v-layout row wrap>

              <v-flex xs4 sm4>
                <v-text-field  label="Nombres" v-model="usuario.nombre"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4>
                <v-text-field  label="Apellidos" v-model="usuario.apellido"></v-text-field>
              </v-flex>
              <v-flex xs4></v-flex>
              <v-flex xs4 sm4>
                <v-text-field

                label="Nombre Usuario"
                v-model="usuario.name_user"
                persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field

                label="Email"
                :rules="emailRules"
                v-model="usuario.email"
                hint="Ingresa tu email!"
                persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs4></v-flex>


            <v-flex xs8 sm8>
              <v-text-field

              label="Rut"
              v-model="usuario.rut"
              hint="Ingresa tu rut"
              persistent-hint
              ></v-text-field>
            </v-flex>

                 <v-flex xs8>
              <v-text-field

              name="input-10-1"
              label="Ingresa tu nueva Contraseña"
              hint="Minimo 8 caracteres"
              v-model="usuario.password"
              min="8"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :type="e1 ? 'password' : 'text'"
              counter
              ></v-text-field>
            </v-flex>
            <v-flex xs4></v-flex>
            <v-flex xs3>
             <v-btn
             block dark color="primary" raised
             @click="submitUser(usuario)"
             :disabled="!valid"
             >
             Guardar Cambios
           </v-btn>
           
         </v-flex>
         <v-flex xs3>
           <v-btn @click="">cancelar</v-btn>
         </v-flex>
            </v-layout>
          </v-flex>


     </v-layout>
   </form>
 </v-container >



</section>
</div>
</template>

<script>
import { updateService } from '@/services/UpdateUser.service'
import { getUser } from '@/services/GetUser.service'
export default {
  data () {
    return {
      e1: false,
      valid: true,
      usuario: {},
      fileUploaded: {},
      dialogArchivo: false,
      archivo: {},
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail no valido'
      ]
    }
  },
  methods: {
    submitUser (usuario) {
      var vm = this
      console.log(usuario)
      var formData = new FormData()
      formData.append('file', vm.archivo.file)
      formData.append('usuario_id', usuario.id)
      formData.append('usuario_avatar', usuario.avatar)
      formData.append('usuario_created_at', usuario.created_at)
      formData.append('usuario_email', usuario.email)
      formData.append('usuario_name', usuario.name)
      formData.append('usuario_name_user', usuario.name_user)
      formData.append('usuario_password', usuario.password)
      formData.append('usuario_remember_token', usuario.remember_token)
      formData.append('usuario_rut', usuario.rut)
      formData.append('usuario_updated_at', usuario.updated_at)
      formData.append('usuario_nombre', usuario.nombre)
      formData.append('usuario_apellido', usuario.apellido)
      console.log(formData)
      updateService.save(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => {
        console.log(data)
      // this.$router.push({name: 'editCource', params: {id: data.body.id}})
      }, response => {
      })
    },
    clear () {
      this.$refs.form.reset()
    },
    loadUsuario () {
      let vm = this
      getUser.query().then(data => {
        console.log(data.body)
        vm.usuario = data.body
      })
    },
    procesarArchivo (event) {
      var vm = this
      vm.archivo.file = event.target.files[0]
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  mounted () {
    this.loadUsuario()
  }
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-img{
    margin-top: 20px
}
.foto-perfil {
  margin-top: 50px;

}

.p-titulo  {
color: #1976d2;
 
margin: 50px;

}

.izquierda {
 border-right: 1px solid #369;
}
</style>

