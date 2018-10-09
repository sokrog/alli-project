<template>
    <div id="app">
        <!-- -webkit-user-select: none не позволяет выделять текст в приложении -->
        <v-app :dark="getDark" style="-webkit-user-select: none">
            <v-container fluid class="back">
                <v-layout row wrap>
                    <the-system-bar></the-system-bar>
                    <the-drawer></the-drawer>
                    <v-content class="content">
                        <router-view></router-view>
                    </v-content>
                </v-layout>
            </v-container>
        </v-app>
    </div>
</template>

<script>
  import TheDrawer from '@/templates/TheDrawer'
  import TheSystemBar from '@/templates/TheSystemBar'

  export default {
    components: {
      TheDrawer,
      TheSystemBar
    },
    computed: {
      getDark () {
        return this.$store.getters.getDark
      }
    }
  }
</script>

<style scoped lang="stylus">
    .back
        background-image url("https://images.wallpaperscraft.com/image/mountains_sky_clouds_mountain_range_stones_99500_1920x1080.jpg")
        background-size cover
        background-attachment fixed
    .content
        background rgba(0,0,0,0.1)
</style>
