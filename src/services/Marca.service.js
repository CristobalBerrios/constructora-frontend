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

  getById (id) {
    return this.getResource().get({id: id})
  }

  save (id, model) {
    return this.getResource().save({id: id}, {marca: model})
  }
}

export const marcaService = new MarcaService('marcas')
