<template>
  <div id="app">
    <v-app :dark="getDark">
      <app-nav-drawer></app-nav-drawer>
    </v-app>
  </div>
</template>

<script>
  import NavDrawer from '@/templates/NavDrawer'

  export default {
    components: {
      appNavDrawer: NavDrawer
    },
    computed: {
      getDark () {
        return this.$store.getters.getDark
      }
    }
  }
</script>

<style>

</style>
