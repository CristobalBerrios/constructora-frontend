import ApiService from './Api.service.js'

class TrabajadorService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const trabajadorService = new TrabajadorService('trabajadores{/id}')
