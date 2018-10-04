export default {
  state: {
    dark: true
  },
  mutations: {
    setDark (state) {
      state.dark = !state.dark
    }
  },
  actions: {
    setDark ({commit}) {
      commit('setDark')
    }
  },
  getters: {
    getDark (store) {
      return store.dark
    }
  }
}
