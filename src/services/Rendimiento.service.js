import ApiService from './Api.service.js'

class RendimientoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const rendimientoService = new RendimientoService('rendimientos')
