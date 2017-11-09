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

  getById (id) {
    return this.getResource().get({id: id})
  }

  save (model) {
    return this.getResource().save({}, model)
    // return Vue.http.post('http://localhost:8000/api/maquinarias', model)
  }
}

<<<<<<< HEAD
export const maquinariaService = new MaquinariaService('maquinarias')
=======
export const maquinariaService = new MaquinariaService('maquinarias{/id}')
>>>>>>> produccion
