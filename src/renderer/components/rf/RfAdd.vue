<template>
  <v-dialog v-model="addDialog" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
          prepend-icon="person"
          name="number"
          label="Number"
          type="text"
          :counter="3"
          v-model="number"
          :rules="numberRules"
      ></v-text-field>
      <v-btn
          color="rgba(0, 0, 0, 0.1)"
          @click="switchAddDialog"
          round
          depressed
          small
      >
        Cancel
      </v-btn>
    </v-form>
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
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>