<template>
  <v-dialog v-model="addDialog" persistent max-width="600px">
    <v-card color="rgba(255, 255, 255, 0.75)">
      <v-card-title class="pb-0">
        <span class="headline">New document</span>
      </v-card-title>
      <v-card-text class="pt-0 pb-5">
        <v-form ref="form" v-model="valid" validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs7 md7 lg7>
                <v-text-field
                    prepend-icon="list"
                    name="number"
                    label="Number"
                    type="text"
                    :counter="3"
                    v-model="number"
                    required
                    :rules="numberRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs5 md5 lg5>
                <v-menu
                    :close-on-content-click="false"
                    v-model="menuDate"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                >
                  <v-text-field
                      slot="activator"
                      v-model="date"
                      name="date"
                      label="Date"
                      hint="MM/DD/YYYY"
                      persistent-hint
                      prepend-icon="event"
                      readonly
                  ></v-text-field>
                  <v-date-picker v-model="dateP" no-title
                                 @input="menuDate = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout row pb-2 pr-2>
          <v-spacer></v-spacer>
          <v-flex xs2 md2 lg2>
            <v-btn
                @click="switchAddDialog"
                round
                flat
            >
              Cancel
            </v-btn>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-btn
                :loading="loading"
                :disabled="!valid || loading"
                @click="addNewDoc"
                round
                flat
            >
              Save
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data: vm => ({
      number: '',
      date: '',
      buyer: '',
      amount: '',
      valid: false,
      numberRules: [
        // нужно еще ограничить ввод чисто цифрами
        v => !!v || 'Number is required',
        v => (v && v.length === 3) || 'Number must have 3 characters'
      ],
      menuDate: false,
      dateP: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10))
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      addDialog () {
        return this.$store.getters.getAddDialog
      },
      computedDateFormatted () {
        this.date = this.formatDate(this.dateP)
      }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.dateP)
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const doc = {
            number: this.number,
            date: this.date,
            buyer: this.buyer,
            amount: this.amount
          }
          this.$store.dispatch('addDoc', doc)
            .then(() => {
              // перенаправляем после добавления на главную страницу
              this.$router.push('/rf')
            })
            .catch(() => {
            })
        }
      },
      switchAddDialog () {
        this.$store.dispatch('changeAddDialog')
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>