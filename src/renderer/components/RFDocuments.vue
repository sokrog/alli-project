<template>
    <v-container grid-list-xl fluid pa-3>
        <v-layout row wrap>
            <v-flex>
                <h1 class="text--primary">Russian Documents</h1>

                <v-card
                        color="rgba(0, 0, 0, 0.1)"
                        flat
                >

                    <v-card-actions>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs2 lg2 pt-4>
                                    <v-btn
                                            block
                                            depressed
                                            color="rgba(0, 0, 0, 0.1)"
                                            @click="refreshDocs"
                                            :loading="getLoading"
                                    >
                                        Refresh
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-actions>

                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="getDocs"
                                class="elevation-0 dtable"
                                :dark=this.$store.getters.getDark
                                :loading="getLoading"
                        >
                            <template slot="headerCell" slot-scope="props">
                                <v-tooltip bottom>
                                    <span slot="activator"> {{props.header.text}} </span>
                                    <span> {{props.header.text}} </span>
                                </v-tooltip>
                            </template>

                            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

                            <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.item }}</td>
                                <td class="text-xs-left">{{ props.item.property}}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Property', value: 'prop'}
      ]
    }),
    methods: {
      refreshDocs () {
        return this.$store.getters.getDocs
      }
    },
    computed: {
      getLoading () {
        return this.$store.getters.getLoading
      },
      getDocs () {
        return this.$store.getters.getDocs
      }
    }
  }
</script>

<style scoped lang="stylus">
    .dtable
        opacity 0.80

    /*.mytable .v-table tbody tr:not(:last-child) {*/
    /*border-bottom: none;*/
    /*}*/
    /*работает, но не на все элементы, не работает с scoped*/
    /*.mytable .v-table{*/
    /*background-color: rgba(255,255,255,0.4);*/
    /*}*/
</style>