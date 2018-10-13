export default {
  state: {
    currencies: []
  },
  mutations: {
    setCurrencies (state, payload) {
      state.currencies = payload
    },
    clearCurrencies (state) {
      state.currencies = []
    }
  },
  actions: {
    setCurrencies ({commit}, payload) {
      commit('clearCurrencies')
      commit('clearError')
      commit('setLoading', true)
      try {
        setTimeout(() => {
          commit('setCurrencies', payload)
          commit('setLoading', false)
        }, 500)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    getCurrencies (store) {
      return store.currencies
    }
  }
}
