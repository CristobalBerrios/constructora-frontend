<template>
  <section class="grey darken-4">
    <v-container xs12 color="grey darken-4">
    <vimeo-player class="text-xs-center" ref="player" :video-id="videoID" @ready="onReady" :player-height="height"></vimeo-player>
    <div class="text-xs-center">
      <v-bottom-sheet v-model="sheet">
        <v-btn slot="activator" color="purple" dark>Ver texo explicativo</v-btn>
        <v-list>
          <h5 class="text-xs-center">{{ leccion.lesson_title }}</h5>
          <v-subheader>{{ leccion.lesson_text }}</v-subheader>
          
        </v-list>
      </v-bottom-sheet>
    </div>
    </v-container>
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
      idLeccion: 0
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
        vm.leccion = data.body
        vm.videoID = data.body.lesson_video
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
    }
  }
}
</script>

<style scoped>


</style>