import ApiService from './Api.service.js'

class UnidadService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const unidadService = new UnidadService('units{/id}')
