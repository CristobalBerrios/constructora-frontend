<template>
  <section class="">
    <v-layout row wrap>
      <v-flex xs7  class="panelIzquierdaLeccion m-0">
          <iframe class="video-vimeo" :src="'https://player.vimeo.com/video/'+videoID+ '?app_id=122963'" frameborder="0" ></iframe>
          <div class="contenedor-tab text-xs-left">
             <div>
                <v-tabs v-model="active">
                  <v-tabs-bar class="grey lighten-3" >
                    <v-tabs-item
                      v-for="tab in tabs2"
                      :key="tab"
                      :href="'#' + tab"
                      ripple
                      class="tab-leccion"
                    >
                     {{ tab }}
                    </v-tabs-item>
                    <v-tabs-slider color="primary"></v-tabs-slider>
                  </v-tabs-bar>
                  <v-tabs-items>
                    <v-tabs-content
                      v-for="tab in tabs2"
                      :key="tab"
                      :id="tab"
                    >
                      <v-card flat>
                         <v-flex class="ml-0 "  v-if="tab === 'Descripcion'">
                        <v-card-text><h5><strong>{{ lesson.lesson_title }}</strong></h5></v-card-text>
                        <v-divider ></v-divider> 
                        <v-list>
                          <v-list-tile avatar  >
                            <v-list-tile-avatar>
                              <img :src="'http://localhost:8000/api/getPhotoPerfil/' + lesson.autor.avatar"/>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title >asda</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                        <p style="padding:20px">{{ lesson.lesson_text }}</p>

                        </v-flex>

                                        <!-- Pestaña de competencias -->

                  <v-flex class="ml-0 "  v-if="tab === 'Competencias'">
                    <v-list three-line>
                      <template v-for="item in competiciones">
                      <v-list-tile avatar  >
                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.competition_title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.competition_description"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      </template>
                    </v-list>

                  </v-flex>

                  <!-- Pestaña de objetivos -->


                  <v-flex class="ml-0 "  v-if="tab === 'R.Aprendizaje'">
                    <v-list three-line>
                      <template v-for="item in objetivos">
                      <v-list-tile avatar  >
                        <v-list-tile-content>
                          <v-list-tile-sub-title v-html="item.objetive_description"></v-list-tile-sub-title>
                        </v-list-tile-content>
          
                      </v-list-tile>
                      </template>
                    </v-list>

                  </v-flex>
                      </v-card>
                    </v-tabs-content>
                  </v-tabs-items>
                </v-tabs>
              </div>
          </div>
      </v-flex>
      <v-flex xs5 class="panelDerechaLeccion">
        <div>
          <v-tabs v-model="active2" scrollable>
            <v-tabs-bar class="grey lighten-3" >
              <v-tabs-item
                v-for="tab in tabs"
                :key="tab"
                :href="'#' + tab"
                ripple
                 class="tab-leccion-derecha"
              >
                  <p style="color: white; padding-top:20px">{{ tab }}</p>
              </v-tabs-item>
              <v-tabs-slider color="white"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-items>
              <v-tabs-content
                v-for="tab in tabs"
                :key="tab"
                :id="tab"
              >
                <v-card flat>
                  <!-- Pestaña de aporte -->
                  <v-flex class="ml-0 "  v-if="tab === 'Aportes'">
                    <v-container 
                      style="max-height: 1000px"
                      class="scroll-y"
                      id="scroll-target"
                    >
                    <v-flex sm10 class="ml-3">
                       <v-text-field
                          name="input-1-3"
                          label="Escribe tu comentario"
                          single-line
                          prepend-icon="avatar"
                        ></v-text-field>
                    </v-flex>
                    <v-flex sm12  offset-xs1>
                      <v-btn  color="primary">
                        Suma tu comentario 
                      </v-btn>
                    </v-flex>
                    <v-list three-line >
                      <template v-for="">
                        <v-divider  ></v-divider>
                        <v-list-tile >
                          <v-list-tile-avatar>
                            icono
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title >tutulo</v-list-tile-title>
                            <v-list-tile-sub-title >sadjkasljdlksajdkljakldklasjdkljsakljdkalsjdkltitulojalksj</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </template>
                    </v-list>
                      <v-layout
                        column
                        align-center
                        justify-center
                        v-scroll="{
                          target: '#scroll-target',
                        }"
                        style="height: auto"
                      >
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <!-- Pestaña de Archivos -->
                                  <v-flex class="ml-0 "  v-if="tab === 'Archivos'">
                    <v-list two-line subheader>
                      <v-list-tile v-for="item in archivos" v-bind:key="item.title" avatar @click="">
                        <v-list-tile-avatar>
                          <v-icon class="red white--text">assignment</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
 
                          <a class="enlace" :href="'http://localhost:8000/api/getArchiveslessons/' + item.url">
                             <v-btn icon ripple @click="descargarArchivo(item.url)">
                            <v-icon color="grey lighten-1">info</v-icon>
                          </v-btn>
                          </a> 
  
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <!-- Pestaña de links -->
  <v-flex class="ml-0 "  v-if="tab === 'Links'">
                    <v-list>
                      <template v-for="item in links">
                      <v-list-tile avatar  >
                        <v-list-tile-content>
                           <a class="enlace" :href=" item.url " target="_blank">
                             <v-btn  flat >{{ item.nombre }}</v-btn>
                          </a>
                        </v-list-tile-content>
       
                      </v-list-tile>
                      </template>
                    </v-list>

                  </v-flex>

                </v-card>
              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>
        </div>
      </v-flex>
    </v-layout>

  </section>
</template>

<script>
import { leccionService } from '@/services/Leccion.service'
import { vueVimeoPlayer } from 'vue-vimeo-player'
export default {
  data () {
    return {
      videoID: 141851770,
      height: 600,
      options: {},
      playerReady: false,
      idEspecialidad: 0,
      leccion: {},
      idLeccion: 0,
      tabs: ['Aportes', 'Archivos', 'Links'],
      tabs2: ['Descripcion', 'Competencias', 'R.Aprendizaje'],
      active: null,
      active2: null,
      offsetTop: 0,
      items2: [
          { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary' },
          { icon: 'assignment', iconClass: 'red white--text', title: 'Kitchen remodel' }
      ]
    }
  },
  components: { vueVimeoPlayer },
  mounted () {
    let vm = this
    vm.idLeccion = vm.$route.params.id
    console.log(vm.idLeccion)
    vm.loadLeccion()
  },
  methods: {
    loadLeccion () {
      let vm = this
      leccionService.getById(vm.idLeccion).then(data => {
        console.log(data.body)
        vm.videoID = data.body.lesson_video
        vm.lesson = data.body
        vm.archivos = data.body.archives
        vm.links = data.body.links
        vm.competiciones = data.body.competences
        vm.objetivos = data.body.objectives
        vm.cantidadUnidades = data.body.unity.length
        console.log(vm.videoID)
      })
    },
    verCurso (id) {
      this.$router.push({name: 'showLesson', params: {id: id}})
    },
    onReady () {
      this.playerReady = true
    },
    play () {
      this.$refs.player.play()
    },
    stop () {
      this.$refs.player.stop()
    },
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped>
.panelDerechaLeccion{
  background-color: white;
  margin-top: 10px;
  /*position: fixed;*/
  min-height: 700px

}

.panelIzquierdaLeccion{
  height: 100%;
}
.tab-leccion{
  background-color: white;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
}
.tab-leccion-derecha{
  background-color: #1976d2;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
}

.contenedor-tab{
  margin-right: 10px;
  margin-left: 10px;
  min-height: 400px !important;
}

.video-vimeo{
  width: 100%;
height: 400px
}

.enlace{
  text-decoration:none;
}

.estilo-p {
  color: white;
  margin-bottom: 0px
}

</style>