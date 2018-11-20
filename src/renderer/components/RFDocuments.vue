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
                                            @click="exportXLS"
                                            :loading="getLoading"
                                    >
                                        Export
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-actions>

                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="testItems"
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
  import XLSX from 'xlsx'

  export default {
    data: () => ({
      testItems: [
        {item: 'Item1', property: 'Prop1'},
        {item: 'Item2', property: 'Prop2'},
        {item: 'Item3', property: 'Prop3'}
      ],
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Property', value: 'prop'}
      ],
      loading: false,
      filename: 'excel/rfdocs.xlsx'
    }),
    methods: {
      exportXLS () {
        // export json to Worksheet of Excel
        // only array possible

        /* Initial row */
        var ws = XLSX.utils.json_to_sheet([{name: 'Name', prop: 'Property'}], {skipHeader: true})

        /* Write data starting at A2 */
        XLSX.utils.sheet_add_json(ws, this.testItems, {skipHeader: true, origin: 'A2'})

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new() // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, ws, 'docs') // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, this.filename) // name of the file is 'rfdocs.xlsx'
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