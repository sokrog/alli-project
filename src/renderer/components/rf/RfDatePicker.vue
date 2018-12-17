<template>
  <!-- возможно нужно будет добавить валидацию формы и тут, и при этом нашу
  дату нужно будет передать при сохранении формы, придется делать вспомогательный store для даты -->
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
</template>

<script>
  export default {
    data: () => ({
      date: null,
      dateFormatted: null,
      menuDate: false
    }),
    methods: {
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
      }
    },
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      }
    }
  }
</script>

<style scoped>

</style>