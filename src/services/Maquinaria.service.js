import ApiService from './Api.service.js'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class MaquinariaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }

  getAll () {
    return this.getResource().query()
  }
}

export const maquinariaService = new MaquinariaService('maquinarias')
