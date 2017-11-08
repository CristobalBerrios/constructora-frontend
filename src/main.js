// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import Vuetify from 'vuetify'

import App from './App'
import router from './router'

import Credentials from '@/services/Credentials.service.js'
// import {address} from '@/constants/address.js'

Vue.use(Vuetify)

Vue.config.productionTip = false

const credentials = new Credentials()
// Added Interceptors
Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', credentials.getToken())
  request.headers.set('Accept', 'application/json')
  next()
  /*
    let vm = this
  next(function (response) {
    if (response.status === 401) {
      credentials.clearCredentials()
      window.location.href = (address.spa)
      vm.$dispatch('logout')
    }
  })
  */
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
