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
      {number: '001', date: '12/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '002', date: '13/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '003', date: '14/04/1994', buyer: 'AUTOKADA', amount: '500.25', returns: false, transf: true, scan: 'scan'},
      {number: '004', date: '15/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '005', date: '16/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: true, transf: true, scan: 'scan'},
      {number: '006', date: '17/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '007', date: '18/04/1994', buyer: 'AUTOKADA', amount: '500.25', returns: false, transf: true, scan: 'scan'},
      {number: '008', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '009', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '010', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '011', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '012', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '013', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '014', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '015', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '016', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '017', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '018', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '019', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '020', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '021', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '022', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '023', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '024', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '025', date: '19/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'},
      {number: '026', date: '20/04/1994', buyer: 'AUTOKADA', amount: '10000', returns: false, transf: true, scan: 'scan'}
    ],
    headers: [
      {text: 'Number', value: 'number'},
      {text: 'Date', value: 'date'},
      {text: 'Buyer', value: 'buyer'},
      {text: 'Amount', value: 'amount'},
      {text: 'Returns', value: 'returns'},
      {text: 'Transffered', value: 'transf'},
      {text: 'Scan', value: 'scan'}
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
    },
    async addDoc () {
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
    },
    getHeaders (state) {
      return state.headers
    }
  }
}
