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
              <v-flex xs12>
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
    data: () => ({
      number: '',
      date: '',
      buyer: '',
      amount: '',
      valid: false,
      numberRules: [
        // нужно еще ограничить ввод чисто цифрами
        v => !!v || 'Number is required',
        v => (v && v.length === 3) || 'Number must have 3 characters'
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
      },
      addNewDoc () {}
    }
  }
</script>

<style scoped lang="stylus">

</style>