import XLSX from 'xlsx'

class Doc {
  constructor (number, date, buyer, amount, returns, transf, scan) {
    this.number = number
    this.date = date
    this.buyer = buyer
    this.amount = amount
    this.scan = scan
    this.returns = returns
    this.transf = transf
  }
}

const FILENAME = 'excel/rfdocs.xlsx'

export default {
  state: {
    docs: [],
    headers: [
      {
        number: 'Number',
        date: 'Date',
        buyer: 'Buyer',
        amount: 'Amount',
        returns: 'Returns',
        transf: 'Transffered',
        scan: 'Scan'
      }
    ],
    search: ''
  },
  mutations: {
    setDocs (state, payload) {
      state.docs = payload
    },
    setSearch (state, payload) {
      state.search = payload
    }
  },
  actions: {
    // Получение документов из файла excel
    async fetchDocs ({commit}) {
      commit('setLoading', true)
      commit('clearError')

      const result = []
      try {
        let wb = XLSX.readFile(FILENAME)
        const docs = XLSX.utils.sheet_to_json(wb.Sheets['docs'])

        Object.keys(docs).forEach(key => {
          const o = docs[key]
          result.push(
            new Doc(
              o.Number,
              o.Date,
              o.Buyer,
              o.Amount,
              o.Returns,
              o.Transffered,
              o.Scan
            )
          )
        })

        commit('setDocs', result)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },

    /* Initial row */
    // var ws = XLSX.utils.json_to_sheet([{name: 'Name', prop: 'Property'}], {skipHeader: true})

    /* Write data starting at A2 */
    // XLSX.utils.sheet_add_json(ws, this.testItems, {skipHeader: true, origin: 'A2'})

    // A workbook is the name given to an Excel file
    // var wb = XLSX.utils.book_new() // make Workbook of Excel

    // add Worksheet to Workbook
    // Workbook contains one or more worksheets
    // XLSX.utils.book_append_sheet(wb, ws, 'docs') // sheetAName is name of Worksheet

    // export Excel file
    // XLSX.writeFile(wb, this.filename) // name of the file is 'rfdocs.xlsx'

    // Отбор тех документов, что еще не вернулись
    async markAsReturns () {
    },

    // Отбор тех документов, что были отданы
    async markAsTransffered () {
    },

    // Удаление документа
    async deleteDoc () {
    },

    // Добавление документа
    async addDoc () {
    },

    // Инициализация документа XSLX
    // async initialXLSX ({commit, state}) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //
    //   try {
    //     /* Initial row */
    //     let ws = XLSX.utils.json_to_sheet(state.headers, {skipHeader: true})
    //
    //     /* Write data starting at A2 */
    //     XLSX.utils.sheet_add_json(ws, state.docs, {skipHeader: true, origin: 'A2'})
    //
    //     // A workbook is the name given to an Excel file
    //     var wb = XLSX.utils.book_new() // make Workbook of Excel
    //
    //     // add Worksheet to Workbook
    //     // Workbook contains one or more worksheets
    //     XLSX.utils.book_append_sheet(wb, ws, 'docs') // sheetAName is name of Worksheet
    //
    //     // export Excel file
    //     XLSX.writeFile(wb, FILENAME) // name of the file is 'rfdocs.xlsx'
    //
    //     commit('setLoading', false)
    //   } catch (e) {
    //     commit('setLoading', false)
    //     commit('setError', e.message)
    //   }
    // }

    changeSearch ({commit}, payload) {
      commit('setSearch', payload)
    }
  },
  getters: {
    getReturnsDocs (state) {
      return state.docs.filter(o => o.returns)
    },
    getUnReturnsDocs (state) {
      return state.docs.filter(o => !o.returns)
    },
    getDocs (state) {
      return state.docs
    },
    getHeaders (state) {
      return state.headers
    },
    getSearch (state) {
      return state.search
    }
  }
}
