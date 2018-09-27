<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field prepend-icon="person" name="email" label="E-mail" type="email"
                            v-model="email" :rules="emailRules"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Пароль" type="password"
                            :counter="6" v-model="password" :rules="passwordRules"></v-text-field>
              <v-text-field prepend-icon="lock" name="confirm-password" label="Повторить пароль" type="password"
                            :counter="6" v-model="confirmPassword" :rules="confirmPasswordRules"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmit" :loading="loading"
                   :disabled="!valid || loading">Зарегистрироваться</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        valid: false,
        emailRules: [
          v => !!v || 'Поле "e-mail" обязателено для ввода',
          v => emailRegex.test(v) || 'Введите корректный e-mail'
        ],
        passwordRules: [
          v => !!v || 'Поле "Пароль" обязателено для ввода',
          v => (v && v.length >= 6) || 'Длина пароля должна быть больше 6 символов'
        ],
        confirmPasswordRules: [
          v => !!v || 'Поле "Повторить пароль" обязателено для ввода',
          v => v === this.password || 'Пароли не совпадают'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }

          this.$store.dispatch('registerUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {})
        }
      }
    }
  }
</script>
