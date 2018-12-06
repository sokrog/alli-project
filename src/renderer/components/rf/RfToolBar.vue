<template>
  <v-layout row>
    <v-flex pl-1>
      <v-layout column mt-1>
        <v-flex>
          <v-btn
              color="rgba(0, 0, 0, 0.1)"
              @click=""
              :loading="getLoading"
              round
              depressed
              small
          >
            <v-icon left>add_circle</v-icon>
            Add
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn
              color="rgba(0, 0, 0, 0.1)"
              @click=""
              :loading="getLoading"
              round
              depressed
              small
          >
            <v-icon left></v-icon>
            button
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-spacer></v-spacer>

    <v-flex xs3 md3 lg3 pr-3 pt-4>
      <v-text-field
          v-model="search"
          @input="changeSearch"
          append-icon="search"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      search: ''
    }),
    methods: {
      changeSearch () {
        this.$store.dispatch('changeSearch', this.search)
      }
    },
    computed: {
      getLoading () {
        return this.$store.getters.getLoading
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>