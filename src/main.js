import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'

Vue.use(Vuetify)
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyBfls2MUbea1JSi940bkFyfCRpbapdPTIU',
      authDomain: 'itc-ads-fc854.firebaseapp.com',
      databaseURL: 'https://itc-ads-fc854.firebaseio.com',
      projectId: 'itc-ads-fc854',
      storageBucket: 'itc-ads-fc854.appspot.com',
      messagingSenderId: '200678472487'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
