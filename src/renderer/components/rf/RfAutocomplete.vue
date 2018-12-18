<template>
  <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-model="select"
      cache-items
      flat
      hide-no-data
      hide-details
      label="Buyer"
      prepend-icon="person"
  ></v-autocomplete>
</template>

<script>
  // нужно будет добавить наверное аутокомплит в общие шаблонные компоненты и передават в него список с возможными компонентами, и помимо этого обрабатывать селекты через state
  export default {
    data: () => ({
      loading: false,
      items: [],
      search: null,
      select: null,
      buyers: ['AUTO KADA', 'AVTO STIM', 'AUTO KASKAD']
    }),
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.buyers.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      }
    }
  }
</script>

<style scoped>

</style>