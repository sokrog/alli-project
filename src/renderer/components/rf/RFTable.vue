<template>
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
    computed: {
      getLoading () {
        return this.$store.getters.getLoading
      },
      getHeaders () {
        return this.headers
      },
      getDocs () {
        return this.$store.getters.getDocs
      }
    },
    created: function () {
      this.$store.dispatch('fetchDocs')
    }
  }
</script>

<style lang="stylus">
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
</style>