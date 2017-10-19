<template>
  <v-app light>
    <toolbar></toolbar>
    <main>
			<v-container fluid>
				<v-layout row wrap>
					<router-view></router-view>
				</v-layout>
			</v-container>
		</main>
  </v-app>
</template>

<script>
  import Toolbar from '@/components/Toolbar'

  export default {
    components: { Toolbar }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
</style>
