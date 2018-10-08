<template>
    <v-container fluid>
        <v-layout row>
            <v-navigation-drawer
                    class="transparent"
                    :mini-variant="mini"
                    floating
                    fixed
                    absolute
                    permanent
                    width="250"
                    app
            >
                <v-list>
                    <v-list-tile
                            v-for="item in items"
                            :key="item.title"
                            @click=""
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
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      mini: false,
      items: [
        {title: 'Dashboard', icon: 'dashboard', url: '/dashboard'},
        {title: 'Currencies', icon: 'euro_symbol', url: '/currencies'}
      ]
    })
  }
</script>

<style scoped>

</style>