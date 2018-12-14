export default {
  state: {
    addDialog: false,
    editDialog: false
  },
  mutations: {
    setAddDialog (state) {
      state.addDialog = !state.addDialog
    },
    setEditDialog (state) {
      state.editDialog = !state.editDialog
    }
  },
  actions: {
    changeAddDialog ({commit}) {
      commit('setAddDialog')
    },
    changeEditDialog ({commit}) {
      commit('setEditDialog')
    }
  },
  getters: {
    getAddDialog (state) {
      return state.addDialog
    },
    getEditDialog (state) {
      return state.editDialog
    }
  }
}
