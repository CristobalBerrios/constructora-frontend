import ApiService from './Api.service.js'

class MarcaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const marcaService = new MarcaService('marcas')
