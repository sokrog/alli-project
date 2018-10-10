<template>
  <v-navigation-drawer
    class="drawer"
    :mini-variant="mini"
    floating
    fixed
    permanent
    width="250"
    app
    clipped
  >
    <v-list class="transparent">
      <v-list-tile
        active-class=""
        v-for="item in items"
        :key="item.title"
        :to="item.url"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
      mini: false,
      items: [
        {title: 'Dashboard', icon: 'dashboard', url: '/'},
        {title: 'Currencies', icon: 'euro_symbol', url: '/currencies'},
        {title: 'Creditors', icon: 'credit_card', url: '/creditors'}
      ]
    })
  }
</script>

<style scoped lang="stylus">
  .drawer
    background rgba(0, 0, 0, 0.1)
</style>