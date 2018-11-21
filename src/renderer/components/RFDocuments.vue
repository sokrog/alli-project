<template>
    <v-container fluid pa-3>
        <v-layout>
            <v-flex>
                <h1 class="text--primary">Russian Documents</h1>

                <v-card
                        color="rgba(0, 0, 0, 0.1)"
                        flat
                >
                    <v-card-actions>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs2 lg2>
                                    <!--добавить группу кнопок-->
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

                                <v-flex>
                                </v-flex>

                                <v-flex xs6 lg6>
                                    <v-text-field
                                            v-model="search"
                                            append-icon="search"
                                            label="Search"
                                            single-line
                                            hide-details
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-actions>

                    <v-card-text>
                        <scrolly class="table-scroll" :passive-scroll="true">
                            <scrolly-viewport>
                                <v-data-table
                                        :headers="getHeaders"
                                        :items="getDocs"
                                        :search="search"
                                        class="elevation-0 dtable"
                                        :dark=this.$store.getters.getDark
                                        :loading="getLoading"
                                        :no-data-text="noDataText"
                                        :no-results-text="noResulttext"
                                        hide-actions
                                        :pagination.sync="pagination"
                                >
                                    <template slot="headerCell" slot-scope="props">
                                        <v-tooltip bottom>
                                            <span slot="activator"> {{props.header.text}} </span>
                                            <span> {{props.header.text}} </span>
                                        </v-tooltip>
                                    </template>

                                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

                                    <template slot="items" slot-scope="props">
                                        <td class="text-xs-left">{{props.item.number}}</td>
                                        <td class="text-xs-left">{{props.item.date}}</td>
                                        <td class="text-xs-left">{{props.item.buyer}}</td>
                                        <td class="text-xs-left">{{props.item.amount}}</td>
                                        <td class="text-xs-left">{{props.item.returns}}</td>
                                        <td class="text-xs-left">{{props.item.transf}}</td>
                                        <td class="text-xs-left">{{props.item.scan}}</td>
                                    </template>
                                </v-data-table>
                            </scrolly-viewport>
                            <scrolly-bar axis="y"></scrolly-bar>
                        </scrolly>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import {Scrolly, ScrollyViewport, ScrollyBar} from 'vue-scrolly'

  export default {
    components: {
      Scrolly,
      ScrollyViewport,
      ScrollyBar
    },
    data: () => ({
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: -1, // -1 for All
        totalItems: 0
      },
      noDataText: 'Table is empty',
      noResulttext: 'Can\'t find it',
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
      },
      getDocs () {
        return this.$store.getters.getDocs
      },
      getHeaders () {
        return this.$store.getters.getHeaders
      }
    }
  }
</script>

<style scoped lang="stylus">

    .dtable
        opacity 0.82

    /* Height of the table row*/
    table.v-table tbody td, table.v-table tbody th {
        height: 30px;
    }

    //    пока не работает
    table.v-table tbody {
        max-height: 250px;
        overflow-y: scroll;
    }

    .table-scroll {
        width: 100%;
        height: 510px;
    }

    /*.mytable .v-table tbody tr:not(:last-child) {*/
    /*border-bottom: none;*/
    /*}*/
    /*работает, но не на все элементы, не работает с scoped*/
    /*.mytable .v-table{*/
    /*background-color: rgba(255,255,255,0.4);*/
    /*}*/
</style>