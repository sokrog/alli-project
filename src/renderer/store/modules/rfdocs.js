import XLSX from 'xlsx'

class Doc {
  constructor (number, date, buyer, amount, returns = false, transf = false, scan = '') {
    this.number = number
    this.date = date
    this.buyer = buyer
    this.amount = amount
    this.scan = scan
  }
}

export default {
  state: {
    docs: [
      {item: 'Item1', property: 'Prop1'},
      {item: 'Item2', property: 'Prop2'},
      {item: 'Item3', property: 'Prop3'}
    ],
    headers: [
      {text: 'Name', value: 'name'},
      {text: 'Property', value: 'prop'}
    ],
    filename: 'excel/rfdocs.xlsx'
  },
  mutations: {
    loadDocs (state, payload) {
      state.docs = payload
    }
  },
  actions: {
    async createDoc ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')

      const result = []
      try {
        const docs = []

        Object.keys(docs).forEach(key => {
          const o = docs[key]
          result.push(
            new Doc(
              o.number,
              o.date,
              o.buyer,
              o.amount,
              o.returns,
              o.transf,
              o.scan
            )
          )
        })

        // export json to Worksheet of Excel
        // only array possible

        /* Initial row */
        var ws = XLSX.utils.json_to_sheet([{name: 'Name', prop: 'Property'}], {skipHeader: true})

        /* Write data starting at A2 */
        XLSX.utils.sheet_add_json(ws, this.testItems, {skipHeader: true, origin: 'A2'})

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new() // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, ws, 'docs') // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, this.filename) // name of the file is 'rfdocs.xlsx'

        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },
    async markAsReturns () {
    },
    async markAsTransffered () {
    },
    async deleteDoc () {
    }
  },
  getters: {
    getReturnsDocs (state) {
      return state.docs.filter(o => o.returns)
    },
    getUnreturnsDocs (state) {
      return state.docs.filter(o => !o.returns)
    },
    getDocs (state) {
      return state.docs
    }
  }
}
