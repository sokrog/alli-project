class Currency {
  constructor (numCode, charCode, scale, name, rate) {
    this.numCode = numCode
    this.charCode = charCode
    this.scale = scale
    this.name = name
    this.rate = rate
  }
}

export default {
  state: {
    currencies: [
      {
        numCode: '1',
        charCode: '1',
        scale: '1',
        name: '1',
        rate: '1'
      }
    ]
  },
  mutations: {
    setCurrencies (state, payload) {
      state.currencies.push(payload)
    },
    clearCurrencies (state) {
      state.currencies = []
    }
  },
  actions: {
    setCurrencies ({commit}, payload) {
      commit('clearCurrencies')
      // commit('clearError')
      // commit('setLoading', true)
      const resultCurrencies = []

      if (!payload) {
        console.log('Что-то не так с передаваемым аргументом payload')
      } else {
        try {
          console.log(payload)
          Object.keys(payload).forEach(numCode => {
            const currency = payload[numCode]
            resultCurrencies.push(
              new Currency(
                currency.numCode,
                currency.charCode,
                currency.scale,
                currency.name,
                currency.rate
              )
            )
          })
          commit('setCurrencies', resultCurrencies)
          // commit('setLoading', false)
        } catch (error) {
          // commit('setError', error.message)
          // commit('setLoading', false)
          throw error
        }
      }
    }
  },
  getters: {
    getCurrencies (store) {
      return store.currencies
    }
  }
}
