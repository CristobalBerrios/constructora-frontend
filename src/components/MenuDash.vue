<template>
  <v-navigation-drawer
      class="blue-grey darken-4 white--text"
      v-model="estado"
      v-on:input="setEstado()"
      width="230"
      persistent
      enable-resize-watcher
      app
      dark
    >
   
    <div class="caja-info">
      <div class="info-user">
        <v-list class="lista">
          <v-list-tile>
            <v-list-tile-avatar>
              <img src="../assets/user.png" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ empresa }}</v-list-tile-title>
              <v-list-tile-sub-title>{{usuario}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </div>
    
      <v-list subheader dense>
        <v-subheader class="">Menu</v-subheader>
        <v-list-tile @click="go('showAllSpecialty')">
          <v-list-tile-action>
            <img src="../assets/shovel.png" alt="" class="icon">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Especialidades</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group dense>
          <v-list-tile slot="item" @click="">
            <v-list-tile-action >
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Cursos</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="go('newCource')">
            <v-list-tile-content>
              <v-list-tile-title>Crear Curso</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('newUnity')">
            <v-list-tile-content>
              <v-list-tile-title>Crear Unidades</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
                <v-list-tile @click="go('cursesCreated')">
            <v-list-tile-content>
                <v-list-tile-title>Cursos creados</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('curseInscrito')">
            <v-list-tile-content>
                  <v-list-tile-title>Cursos Inscritos</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list-group>
        <v-list-group dense>
          <v-list-tile slot="item" @click="">
            <v-list-tile-action >
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Licencias</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="go('newLicence')">
            <v-list-tile-content>
              <v-list-tile-title>Crear Licencia</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list-group>
        <v-list-group dense>
          <v-list-tile slot="item" @click="">
            <v-list-tile-action >
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Configuraciones</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="go('obras')">
            <v-list-tile-content>
              <v-list-tile-title>Categorias</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="go('obras')">
            <v-list-tile-content>
              <v-list-tile-title>Logos</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list-group>
        <v-subheader>Soporte</v-subheader>
         <v-list-tile @click="go('consultas')">
           <v-list-tile-action >
              <v-icon>chat</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Consultas</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: ['estado', 'usuario', 'empresa'],
  methods: {
    go (ruta) {
      this.$router.push({name: ruta})
    },
    setEstado () {
      this.$emit('setEstado')
    }
  }
}
</script>

<style scoped>

.caja-info {
  height: 120px;
  background-image: url('../assets/fondo_dash.png');
  background-size: cover;
  background-position: center;
}

.lista {
  height: 100%;
}


.info-user {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  font-size: 1.2em;
}

.icon {
  height: 25px;
}


</style>


