<template>
    <v-container fluid pa-0 fill-height>
        <v-layout column>
            <v-flex ml-2 mr-2 mt-2>
                <v-layout row style="background-color: rgba(0,0,0,0.10)">
                    <v-flex pl-1>
                        <v-layout column mt-1>
                            <v-flex>
                                <v-btn
                                        color="rgba(0, 0, 0, 0.1)"
                                        @click="init"
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

            <v-flex xs11 md11 lg11 ml-2 mr-2 mb-2 mt-0 pa-2 style="background-color: rgba(0,0,0,0.10)">
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
                                <td class="text-xs-left">
                                    <v-btn
                                            :to="props.item.scan"
                                            @click=""
                                            :loading="getLoading"
                                            flat
                                            small
                                            round
                                    >
                                        Scan
                                    </v-btn>
                                </td>
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
            </v-flex>
            <v-flex>
                <!-- Нужно добавить и сообщения об успешном выполнении операции, но только на главное окно -->
                <template v-if="error">
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
        {text: 'Returns', value: 'returns', width: 100},
        {text: 'Transffered', value: 'transf', width: 100},
        {text: 'Scan', value: 'scan', sortable: false, width: 100, align: 'center'},
        {text: 'Edit/Delete', value: 'actions', width: 160, sortable: false}
      ]
    }),
    methods: {
      refreshDocs () {
        return this.$store.getters.getDocs
      },
      init () {
        this.$store.dispatch('initialXLSX')
      },
      closeError () {
        this.$store.dispatch('clearError')
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
      },
      error () {
        return this.$store.getters.error
      }
    }
  }
</script>

<style scoped lang="stylus">

    .dtable
        opacity 0.75

    /* Height of the table row*/
    table.v-table tbody td, table.v-table tbody th {
        height: 30px;
    }

    .table-scroll {
        width: 100%;
        height: 100%;
    }

    /*.mytable .v-table tbody tr:not(:last-child) {*/
    /*border-bottom: none;*/
    /*}*/
    /*работает, но не на все элементы, не работает с scoped*/
    /*.mytable .v-table{*/
    /*background-color: rgba(255,255,255,0.4);*/
    /*}*/
</style>