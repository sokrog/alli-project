<template>
  <v-layout>
    <template v-if="error">
      <!-- Нужно добавить сообщения об успешных операциях, для этого добавить новый store success-->
      <v-snackbar
          :timeout="5000"
          @input="closeError"
          color="red darken-1"
          :value="true"
      >
        {{error}}
        <v-btn
            dark
            flat
            round
            @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      closeError () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>