import ApiService from './Api.service.js'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class MarcaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }

  getAll () {
    return this.getResource().query()
  }
}

export const marcaService = new MarcaService('marca')
