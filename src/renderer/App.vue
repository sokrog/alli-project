<template>
  <div id="app">
    <!-- -webkit-user-select: none не позволяет выделять текст в приложении -->
    <v-app :dark="getDark" style="-webkit-user-select: none">
      <v-content class="back">
        <the-system-bar></the-system-bar>

        <the-drawer></the-drawer>

        <router-view>

        </router-view>

      </v-content>
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
    background-image url("./assets/back.jpg")
    background-size cover
    background-attachment fixed

</style>
