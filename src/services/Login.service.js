import ApiService from './Api.service.js'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class LoginService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
  authenticate (credentials) {
    return this.getResource().save(credentials)
  }
}

export const loginService = new LoginService('login')
