<template>
  <v-container grid-list-xl fluid pa-3>
    <v-layout row wrap>
      <v-flex>
        <h1 class="text--primary">Currencies</h1>
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
                    @click="downloadCurrencies"
                    :loading="getLoading"
                  >
                    Show
                  </v-btn>
                </v-flex>
                <v-flex xs4 lg4>
                  <v-menu
                    :close-on-content-click="false"
                    v-model="menuDate"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="computedDateFormatted"
                      label="Date"
                      hint="MM/DD/YYYY"
                      persistent-hint
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title
                                   @input="menuDate = false"
                    ></v-date-picker>
                  </v-menu>
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
            <v-data-table
              :headers="headers"
              :items="computedCurrencies"
              :search="search"
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
                <td class="text-xs-left">{{ props.item.numCode }}</td>
                <td class="text-xs-left">{{ props.item.charCode }}</td>
                <td class="text-xs-left">{{ props.item.scale }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.rate }}</td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      date: null,
      dateFormatted: null,
      menuDate: false,
      search: '',
      headers: [
        {text: 'Number', value: 'numCode'},
        {text: 'Code', value: 'charCode'},
        {text: 'Scale', value: 'scale'},
        {text: 'Name', value: 'name'},
        {text: 'Rate', value: 'rate'}
      ],
      loading: false
    }),
    methods: {
      downloadCurrencies () {
        // let that = this нужно написать,
        // чтобы была возможность обратиться к объекту this внутри функции,
        // потому что иногда это не получается
        let that = this

        let url = 'http://www.nbrb.by/Services/XmlExRates.aspx'
        if (this.date != null) {
          url += '?ondate=' + this.date
        }

        let currencies = []

        let xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.send()
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return
          if (xhr.status !== 200) {
            // console.log(xhr.status + ': ' + xhr.statusText)
          } else {
            try {
              let xml = xhr.responseXML
              let x = xml.getElementsByTagName('Currency')

              for (let i = 0; i < x.length; i++) {
                currencies.push(
                  {
                    numCode: x[i].getElementsByTagName('NumCode')[0].childNodes[0].nodeValue,
                    charCode: x[i].getElementsByTagName('CharCode')[0].childNodes[0].nodeValue,
                    scale: x[i].getElementsByTagName('Scale')[0].childNodes[0].nodeValue,
                    name: x[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue,
                    rate: x[i].getElementsByTagName('Rate')[0].childNodes[0].nodeValue
                  }
                )
              }
            } catch (e) {
              console.log(e.message)
            }
          }
          that.$store.dispatch('setCurrencies', currencies)
        }
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      computedCurrencies () {
        return this.$store.getters.getCurrencies
      },
      getLoading () {
        return this.$store.getters.getLoading
      }
    },
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
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
