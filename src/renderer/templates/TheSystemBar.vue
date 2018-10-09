<template>
  <!-- style="-webkit-app-region: drag" позволяет перетаскивать окно приложения -->

  <v-system-bar app color="rgba(0, 0, 0, 0.2)">
    <v-spacer></v-spacer>
    <v-btn small icon @click="handleMinimize">
      <v-icon small>remove</v-icon>
    </v-btn>
    <v-btn small icon @click="handleMaximize">
      <v-icon small>check_box_outline_blank</v-icon>
    </v-btn>
    <v-btn small icon @click="handleClose">
      <v-icon small>close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
  import {ipcRenderer} from 'electron'

  export default {
    methods: {
      handleMinimize () {
        ipcRenderer.send('window:minimize')
      },
      handleMaximize () {
        ipcRenderer.send('window:maximize')
      },
      handleClose () {
        ipcRenderer.send('window:closed')
      }
    }
  }
</script>

<style scoped>
</style>