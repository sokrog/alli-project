<template>
  <v-dialog v-model="addDialog" persistent max-width="600px">
    <v-card color="rgba(255, 255, 255, 0.75)">
      <v-card-title class="pb-0">
        <span class="headline grey--text text--darken-3">New document</span>
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
                <rf-date-picker></rf-date-picker>
              </v-flex>

              <v-flex xs12 md12 lg12 pb-4>
                <rf-autocomplete></rf-autocomplete>
              </v-flex>

              <v-flex xs7 md7 lg7>
                  <v-text-field
                      prepend-icon="euro_symbol"
                      name="amount"
                      label="Amount"
                      type="text"
                      v-model="amount"
                      required
                      :rules="amountRules"
                  ></v-text-field>
              </v-flex>

              <v-flex xs5 md5 lg5 pt-4>
                <span class="headline grey--text text--darken-3">RUB</span>
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
                @click="onSubmit"
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
  import RfDatePicker from './RfDatePicker'
  import RfAutocomplete from './RfAutocomplete'

  export default {
    components: {
      RfDatePicker,
      RfAutocomplete
    },
    data: () => ({
      number: null,
      date: null,
      buyer: null,
      amount: null,
      valid: false,
      numberRules: [
        // нужно еще ограничить ввод чисто цифрами
        v => !!v || 'Number is required',
        v => (v && v.length === 3) || 'Number must have 3 characters'
      ],
      amountRules: [
        // нужно еще ограничить ввод чисто цифрами и в формате float
        v => !!v || 'Amount is required'
      ]
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      addDialog () {
        return this.$store.getters.getAddDialog
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
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>