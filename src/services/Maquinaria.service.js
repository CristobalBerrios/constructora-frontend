import ApiService from './Api.service.js'

class MaquinariaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const maquinariaService = new MaquinariaService('maquinarias{/id}')
