<template>
  <v-container fluid pa-0 fill-height>
    <v-layout column>
      <v-flex ml-2 mr-2 mt-2>
        <rf-tool-bar></rf-tool-bar>
      </v-flex>

      <v-flex xs11 md11 lg11 ml-2 mr-2 mb-2 mt-0 pa-2>
        <rf-table></rf-table>
      </v-flex>

      <v-flex>
        <rf-add></rf-add>
        <the-message></the-message>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TheMessage from '../messages/TheMessage'
  import RfTable from './RfTable'
  import RfToolBar from './RfToolBar'
  import RfAdd from './RfAdd'
  import RfEdit from './RfEdit'

  export default {
    data: () => ({
      addDialog: false,
      editDialog: false
    }),
    components: {
      TheMessage,
      RfTable,
      RfToolBar,
      RfAdd,
      RfEdit
    }
  }
</script>

<style scoped lang="stylus">

</style>