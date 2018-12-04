<template>
  <v-container fluid pa-0 fill-height>
    <v-layout column>
      <v-flex ml-2 mr-2 mt-2>
        <v-layout row class="bcg-color">
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
                    @click="refreshDocs"
                    :loading="getLoading"
                    round
                    depressed
                    small
                >
                  <v-icon left>loop</v-icon>
                  Refresh
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs3 md3 lg3 pr-3 pt-4>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs11 md11 lg11 ml-2 mr-2 mb-2 mt-0 pa-2>
        <r-f-table></r-f-table>
      </v-flex>

      <v-flex>
        <the-message></the-message>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TheMessage from '../messages/TheMessage'
  import RFTable from './RFTable'

  export default {
    components: {
      TheMessage,
      RFTable
    },
    data: () => ({
      loading: false,
      search: ''
    }),
    methods: {
      refreshDocs () {
        return this.$store.getters.getDocs
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