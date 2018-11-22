<template>
    <v-container fluid pa-3>
        <v-layout>
            <v-flex>
                <v-card
                        color="rgba(0, 0, 0, 0.1)"
                        flat
                >
                    <v-card-actions>
                        <v-toolbar dense flat class="transparent">
                            <v-layout row>
                                <v-flex xs4 lg4 mt-2>
                                    <v-btn
                                            color="rgba(0, 0, 0, 0.1)"
                                            @click=""
                                            :loading="getLoading"
                                            round
                                            depressed
                                    >
                                        <v-icon left>add_circle</v-icon>
                                        Add
                                    </v-btn>
                                    <v-btn
                                            color="rgba(0, 0, 0, 0.1)"
                                            @click="refreshDocs"
                                            :loading="getLoading"
                                            round
                                            depressed
                                    >
                                        <v-icon left>loop</v-icon>
                                        Refresh
                                    </v-btn>
                                </v-flex>

                                <v-spacer></v-spacer>

                                <v-flex xs3 lg3>
                                    <v-text-field
                                            v-model="search"
                                            append-icon="search"
                                            label="Search"
                                            single-line
                                            hide-details
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-toolbar>
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
                                        :no-results-text="noResultText"
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
                                        <td class="text-xs-left">
                                            <v-checkbox
                                                    :input-value="props.item.returns"
                                                    color="black"
                                                    disabled
                                                    style="height: 30px"
                                            ></v-checkbox>
                                        </td>
                                        <td class="align-center">
                                            <v-checkbox
                                                    :input-value="props.item.transf"
                                                    color="black"
                                                    disabled
                                                    style="height: 30px"
                                            ></v-checkbox>
                                        </td>
                                        <td class="text-xs-left">{{props.item.scan}}</td>
                                        <td class="text-xs-left">
                                            <v-btn
                                                    @click=""
                                                    :loading="getLoading"
                                                    depressed
                                                    flat
                                                    small
                                                    icon
                                            >
                                                <v-icon small>edit</v-icon>
                                            </v-btn>
                                            <v-btn
                                                    @click=""
                                                    :loading="getLoading"
                                                    depressed
                                                    flat
                                                    small
                                                    icon
                                            >
                                                <v-icon small>delete</v-icon>
                                            </v-btn>
                                        </td>
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
      noResultText: 'Can\'t find it',
      search: '',
      headers: [
        {text: 'Number', value: 'number', width: 100},
        {text: 'Date', value: 'date'},
        {text: 'Buyer', value: 'buyer'},
        {text: 'Amount', value: 'amount'},
        {text: 'Returns', value: 'returns'},
        {text: 'Transffered', value: 'transf'},
        {text: 'Scan', value: 'scan', sortable: false},
        {text: 'Edit/Delete', value: 'actions', width: 160, sortable: false}
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
      },
      getHeaders () {
        return this.headers
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